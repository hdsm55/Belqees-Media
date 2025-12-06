/**
 * React Hook for CSRF Token
 * Hook للحصول على CSRF Token
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Get CSRF token from API
 * الحصول على CSRF token من API
 */
async function fetchCSRFToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/csrf-token', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.token || null;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    return null;
  }
}

/**
 * React Hook to get CSRF token
 * Hook للحصول على CSRF token
 */
export function useCSRF(): {
  token: string | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
} {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const newToken = await fetchCSRFToken();
      setToken(newToken);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch CSRF token'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { token, loading, error, refresh };
}

/**
 * Get CSRF token synchronously (for use in event handlers)
 * الحصول على CSRF token بشكل متزامن (للاستخدام في event handlers)
 */
export async function getCSRFToken(): Promise<string | null> {
  return fetchCSRFToken();
}

