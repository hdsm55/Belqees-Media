/**
 * CSRF Token Input Component
 * مكون لإضافة CSRF token للـ forms
 */

'use client';

import { useCSRF } from '@/hooks/useCSRF';

/**
 * Hidden input for CSRF token
 * Input مخفي لـ CSRF token
 */
export function CSRFTokenInput() {
  const { token, loading } = useCSRF();

  if (loading || !token) {
    return null;
  }

  return <input type="hidden" name="_csrf" value={token} />;
}

/**
 * Get CSRF token for use in fetch requests
 * الحصول على CSRF token للاستخدام في fetch requests
 */
export function getCSRFHeader(): Record<string, string> {
  // This will be handled by the hook in components
  // For direct fetch calls, use useCSRF hook
  return {};
}

