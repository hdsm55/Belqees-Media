'use client';

import { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeroSection from '@/components/blocks/PageHeroSection';
import { useCSRF } from '@/hooks/useCSRF';

export default function ContactPage() {
  const { t } = useTranslation();
  const { token: csrfToken } = useCSRF();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');
    setIsSubmitting(true);

    try {
      // Client-side validation
      const result = contactSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        result.error.errors.forEach((error) => {
          const field = error.path[0] as keyof ContactFormData;
          if (field) {
            fieldErrors[field] = error.message;
          }
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        body: JSON.stringify({
          ...result.data,
          ...(csrfToken && { _csrf: csrfToken }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors min-h-screen">
      {/* Hero Section */}
      <PageHeroSection
        title={t('contact.pageTitle')}
        subtitle={t('contact.pageSubtitle')}
        backgroundImage="/images-optimized/contact-hero.jpg"
      />

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-dark dark:text-gray-100 mb-4">
                {t('contact.sendMessage')}
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg" role="alert">
                  {t('contact.successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg" role="alert">
                  {t('contact.errorMessage')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label={t('contact.form.label')}>
                <div>
                  <Input
                    label={t('contact.form.name')}
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    error={errors.name}
                    id="contact-name"
                  />
                </div>

                <div>
                  <Input
                    label={t('contact.form.email')}
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    error={errors.email}
                    id="contact-email"
                  />
                </div>

                <div>
                  <Input
                    label={t('contact.form.subject')}
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    error={errors.subject}
                    id="contact-subject"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-dark dark:text-gray-300 mb-1">
                    {t('contact.form.message')} <span className="text-red-500" aria-label={t('contact.required')}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-dark dark:text-gray-100 ${
                      errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="video"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                  showRecordingDot={true}
                  aria-label={isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-dark dark:text-gray-100 mb-4">
                {t('contact.getInTouch')}
              </h2>
              <div className="space-y-4">
                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-gray-100 mb-1">
                    {t('contact.address')}
                  </h3>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=TAHTAKALE+MAH.+ISPARTAKULE+BLV.+T2+BLOK+NO:2M+AVCILAR+ISTANBUL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-light dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded inline-flex items-center gap-2"
                    aria-label={`${t('contact.address')}: ${t('contact.addressValue')} - افتح في خرائط Google`}
                  >
                    <span>{t('contact.addressValue')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Contacts */}
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-gray-100 mb-2">
                    {t('contact.contacts')}
                  </h3>

                  <div className="space-y-3">
                    {/* Phone */}
                    <div>
                      <h4 className="text-base font-medium text-dark dark:text-gray-100 mb-1">
                        {t('contact.phone')}:
                      </h4>
                      <div className="space-y-1">
                        <a
                          href="tel:+902124122060"
                          className="block text-dark-light dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                          aria-label={`${t('contact.phone')} ${t('contact.phone1')}`}
                        >
                          {t('contact.phone1')}
                        </a>
                        <a
                          href="tel:+908508113366"
                          className="block text-dark-light dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                          aria-label={`${t('contact.phone')} ${t('contact.phone2')}`}
                        >
                          {t('contact.phone2')}
                        </a>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div>
                      <h4 className="text-base font-medium text-dark dark:text-gray-100 mb-1">
                        {t('contact.mobile')}:
                      </h4>
                      <a
                        href="tel:+905393346032"
                        className="block text-dark-light dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                        aria-label={`${t('contact.mobile')} ${t('contact.mobile1')}`}
                      >
                        {t('contact.mobile1')}
                      </a>
                    </div>

                    {/* Email */}
                    <div>
                      <h4 className="text-base font-medium text-dark dark:text-gray-100 mb-1">
                        {t('contact.email')}:
                      </h4>
                      <a
                        href="mailto:Contact@belqeesmedia.com"
                        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                        aria-label={`${t('contact.email')} ${t('contact.emailValue')}`}
                      >
                        {t('contact.emailValue')}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-gray-100 mb-2">
                    {t('contact.socialMedia')}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/belqeesmedia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-dark dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/belqeesmedia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-dark dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/belqeesmedia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-dark dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/908508113366"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-dark dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      aria-label="WhatsApp"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
