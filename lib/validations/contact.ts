import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .max(100, 'الاسم طويل جداً'),
  email: z
    .string()
    .email('البريد الإلكتروني غير صحيح')
    .min(5, 'البريد الإلكتروني قصير جداً')
    .max(255, 'البريد الإلكتروني طويل جداً'),
  subject: z
    .string()
    .max(200, 'الموضوع طويل جداً')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل')
    .max(5000, 'الرسالة طويلة جداً'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

