/**
 * Content Sanitization Utilities
 * أدوات تنظيف المحتوى من XSS attacks
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * تنظيف محتوى HTML لمنع هجمات XSS
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(html, {
    // Allowed tags
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i', 's', 'strike',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'pre', 'code',
      'div', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'hr', 'hr',
    ],
    // Allowed attributes
    ALLOWED_ATTR: [
      'href', 'title', 'alt', 'src', 'width', 'height',
      'class', 'id', 'style',
      'target', 'rel', 'data-*',
    ],
    // Allowed URI schemes
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // Keep relative URLs
    ALLOW_DATA_ATTR: true,
  });
}

/**
 * Sanitize text content (removes all HTML)
 * تنظيف النص (إزالة جميع HTML)
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitize HTML for rich text editor content
 * تنظيف HTML لمحتوى محرر النص المنسق
 */
export function sanitizeRichText(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i', 's', 'strike',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'pre', 'code',
      'div', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'hr',
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'alt', 'src', 'width', 'height',
      'class', 'id', 'style',
      'target', 'rel',
    ],
    ALLOW_DATA_ATTR: true,
  });
}

