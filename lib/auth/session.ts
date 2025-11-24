import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export interface UserSession {
    id: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'CONTRIBUTOR' | 'VIEWER';
    supabaseUserId: string | null;
}

/**
 * الحصول على المستخدم الحالي من Session
 */
export async function getCurrentUser(): Promise<UserSession | null> {
    try {
        const supabase = await createClient();
        const {
            data: { user: supabaseUser },
            error: supabaseError,
        } = await supabase.auth.getUser();

        if (supabaseError || !supabaseUser) {
            return null;
        }

        // البحث عن المستخدم في قاعدة البيانات
        const user = await prisma.user.findUnique({
            where: {
                supabaseUserId: supabaseUser.id,
            },
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role,
            supabaseUserId: user.supabaseUserId || null,
        };
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

/**
 * التحقق من صلاحيات المستخدم
 */
export async function hasPermission(
    requiredRole: UserSession['role']
): Promise<boolean> {
    const user = await getCurrentUser();
    if (!user) return false;

    const roleHierarchy: Record<UserSession['role'], number> = {
        VIEWER: 1,
        CONTRIBUTOR: 2,
        EDITOR: 3,
        ADMIN: 4,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

/**
 * التحقق من أن المستخدم مسجل دخول
 */
export async function requireAuth(): Promise<UserSession> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}

/**
 * التحقق من أن المستخدم لديه صلاحية معينة
 */
export async function requireRole(
    requiredRole: UserSession['role']
): Promise<UserSession> {
    const user = await requireAuth();
    const hasAccess = await hasPermission(requiredRole);

    if (!hasAccess) {
        throw new Error('Forbidden: Insufficient permissions');
    }

    return user;
}

