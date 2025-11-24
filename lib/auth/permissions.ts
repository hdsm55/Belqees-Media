import { UserSession } from './session';

export type Permission =
    | 'pages.read'
    | 'pages.write'
    | 'pages.delete'
    | 'services.read'
    | 'services.write'
    | 'services.delete'
    | 'portfolio.read'
    | 'portfolio.write'
    | 'portfolio.delete'
    | 'events.read'
    | 'events.write'
    | 'events.delete'
    | 'blog.read'
    | 'blog.write'
    | 'blog.delete'
    | 'media.read'
    | 'media.write'
    | 'media.delete'
    | 'users.read'
    | 'users.write'
    | 'users.delete'
    | 'settings.read'
    | 'settings.write';

const rolePermissions: Record<UserSession['role'], Permission[]> = {
    VIEWER: [
        'pages.read',
        'services.read',
        'portfolio.read',
        'events.read',
        'blog.read',
        'media.read',
    ],
    CONTRIBUTOR: [
        'pages.read',
        'pages.write',
        'services.read',
        'services.write',
        'portfolio.read',
        'portfolio.write',
        'events.read',
        'events.write',
        'blog.read',
        'blog.write',
        'media.read',
        'media.write',
    ],
    EDITOR: [
        'pages.read',
        'pages.write',
        'pages.delete',
        'services.read',
        'services.write',
        'services.delete',
        'portfolio.read',
        'portfolio.write',
        'portfolio.delete',
        'events.read',
        'events.write',
        'events.delete',
        'blog.read',
        'blog.write',
        'blog.delete',
        'media.read',
        'media.write',
        'media.delete',
    ],
    ADMIN: [
        'pages.read',
        'pages.write',
        'pages.delete',
        'services.read',
        'services.write',
        'services.delete',
        'portfolio.read',
        'portfolio.write',
        'portfolio.delete',
        'events.read',
        'events.write',
        'events.delete',
        'blog.read',
        'blog.write',
        'blog.delete',
        'media.read',
        'media.write',
        'media.delete',
        'users.read',
        'users.write',
        'users.delete',
        'settings.read',
        'settings.write',
    ],
};

/**
 * التحقق من أن المستخدم لديه صلاحية معينة
 */
export function hasPermission(
    userRole: UserSession['role'],
    permission: Permission
): boolean {
    return rolePermissions[userRole]?.includes(permission) ?? false;
}

/**
 * الحصول على جميع الصلاحيات للمستخدم
 */
export function getUserPermissions(
    userRole: UserSession['role']
): Permission[] {
    return rolePermissions[userRole] ?? [];
}

