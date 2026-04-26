'use client';

import { useState } from 'react';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Button from '@/components/atoms/Button';
import Section from '@/components/atoms/Section';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeroSection from '@/components/blocks/PageHeroSection';
import { useCSRF } from '@/hooks/useCSRF';
import { contactInfo, socialLinks } from '@/data/contact';

export default function ContactPage() {
  const { t } = useTranslation();
  const { token: csrfToken } = useCSRF();
  const info = contactInfo(t);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');
    setIsSubmitting(true);

    try {
      const result = contactSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        result.error.errors.forEach(error => {
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

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
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
    <div className="bg-white dark:bg-dark-900 transition-colors min-h-screen">
      {/* Hero Section */}
      <PageHeroSection
        title={t('contact.pageTitle')}
        subtitle={t('contact.pageSubtitle')}
        backgroundImage="/images-optimized/contact-hero.jpg"
      />

      {/* Contact Content */}
      <Section id="contact-content" spacing="md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-white dark:bg-dark-800 p-8 md:p-12 border border-dark-200 dark:border-dark-700 shadow-2xl group">
              <CornerBrackets showOnHover={false} />
              <h2 className="text-3xl font-heading font-bold text-dark-900 dark:text-white mb-8">
                {t('contact.sendMessage')}
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg animate-fade-in">
                  {t('contact.successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg animate-fade-in">
                  {t('contact.errorMessage')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t('contact.form.name')}
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                  <Input
                    label={t('contact.form.email')}
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    placeholder="example@mail.com"
                  />
                </div>

                <Input
                  label={t('contact.form.subject')}
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  error={errors.subject}
                  placeholder={t('contact.form.subjectPlaceholder')}
                />

                <TextArea
                  label={t('contact.form.message')}
                  required
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  error={errors.message}
                  placeholder={t('contact.form.messagePlaceholder')}
                />

                <Button
                  type="submit"
                  variant="recording"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                  showRecordingDot={true}
                  showBrackets={true}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-dark-900 dark:text-white mb-8">
                {t('contact.getInTouch')}
              </h2>
              
              <div className="space-y-6">
                {/* Address Card */}
                <div className="relative bg-white dark:bg-dark-800 p-8 border border-dark-200 dark:border-dark-700 shadow-lg group hover:border-primary-500 transition-colors">
                  <CornerBrackets showOnHover={true} />
                  <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
                    {info.address.label}
                  </h3>
                  <a
                    href={info.address.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-dark-600 dark:text-dark-300 hover:text-primary-500 transition-colors leading-relaxed block font-sans"
                  >
                    {info.address.value}
                  </a>
                </div>

                {/* Communication Card */}
                <div className="relative bg-white dark:bg-dark-800 p-8 border border-dark-200 dark:border-dark-700 shadow-lg group hover:border-primary-500 transition-colors">
                  <CornerBrackets showOnHover={true} />
                  <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-6">
                    {t('contact.contacts')}
                  </h3>
                  
                  <div className="space-y-6 font-sans">
                    <div>
                      <span className="block text-sm text-dark-400 dark:text-dark-500 mb-2">{t('contact.phone')}</span>
                      {info.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.value}`} className="block text-lg text-dark-600 dark:text-dark-300 hover:text-primary-500 transition-colors">
                          {phone.label}
                        </a>
                      ))}
                    </div>
                    
                    <div>
                      <span className="block text-sm text-dark-400 dark:text-dark-500 mb-2">{t('contact.mobile')}</span>
                      <a href={`tel:${info.mobile.value}`} className="block text-lg text-dark-600 dark:text-dark-300 hover:text-primary-500 transition-colors">
                        {info.mobile.label}
                      </a>
                    </div>

                    <div>
                      <span className="block text-sm text-dark-400 dark:text-dark-500 mb-2">{t('contact.email')}</span>
                      <a href={`mailto:${info.email.value}`} className="block text-lg text-primary-500 hover:text-primary-600 transition-colors font-semibold">
                        {info.email.label}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-4">
                  <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-6">
                    {t('contact.socialMedia')}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-dark-900 dark:bg-dark-700 text-white rounded-full flex items-center justify-center hover:bg-primary-500 transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label={social.name}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
