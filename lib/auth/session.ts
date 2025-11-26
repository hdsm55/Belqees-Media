import { cookies } from 'next/headers';
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
        // أولاً: نحاول قراءة المستخدم مباشرة من كوكي Supabase بدون استدعاء الشبكة
        const cookieStore = cookies();
        const allCookies = cookieStore.getAll();
        const authCookie = allCookies.find((c) =>
            c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
        );

        if (authCookie) {
            try {
                const decoded = decodeURIComponent(authCookie.value);
                const session = JSON.parse(decoded) as {
                    user?: { id: string; email?: string | null };
                };

                if (session.user?.id) {
                    const prismaUser = await prisma.user.findUnique({
                        where: { supabaseUserId: session.user.id },
                    });

                    if (prismaUser) {
                        return {
                            id: prismaUser.id,
                            email: prismaUser.email,
                            role: prismaUser.role,
                            supabaseUserId: prismaUser.supabaseUserId || null,
                        };
                    }

                    console.log('[auth] Cookie user found but no Prisma user', {
                        supabaseUserId: session.user.id,
                    });
                }
            } catch (cookieError) {
                console.warn('[auth] Failed to parse Supabase auth cookie', {
                    error: cookieError,
                });
            }
        }

        // في حال فشلنا في القراءة من الكوكي، نرجع للطريقة الكلاسيكية مع Supabase
        const supabase = await createClient();
        const {
            data: { user: supabaseUser },
            error: supabaseError,
        } = await supabase.auth.getUser();

        if (supabaseError || !supabaseUser) {
            console.log('[auth] No Supabase user in session', { supabaseError });
            return null;
        }

        // البحث عن المستخدم في قاعدة البيانات
        const user = await prisma.user.findUnique({
            where: {
                supabaseUserId: supabaseUser.id,
            },
        });

        if (!user) {
            console.log('[auth] Supabase user found but no Prisma user', {
                supabaseUserId: supabaseUser.id,
            });
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

