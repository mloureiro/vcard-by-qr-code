import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ContactData } from '../types';

// Zod validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  emails: z.array(z.object({
    value: z.string().email('Invalid email address')
  })).min(1, 'At least one email is required'),
  phones: z.array(z.object({
    value: z.string().min(1, 'Phone number is required').regex(/^[+\d\s()-]+$/, 'Invalid phone number format')
  })).min(1, 'At least one phone is required'),
  websites: z.array(z.object({
    value: z.string()
      .refine((val) => {
        if (!val) return true; // Allow empty strings
        // Allow URLs with or without protocol
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        return urlPattern.test(val);
      }, 'Invalid URL format')
  })),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface UseContactFormProps {
  onSubmit: (data: ContactData) => void;
}

export function useContactForm({ onSubmit }: UseContactFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      emails: [{ value: '' }],
      phones: [{ value: '' }],
      websites: [{ value: '' }],
    },
  });

  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control,
    name: 'emails',
  });

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control,
    name: 'phones',
  });

  const { fields: websiteFields, append: appendWebsite, remove: removeWebsite } = useFieldArray({
    control,
    name: 'websites',
  });

  const handleFormSubmit = (data: ContactFormData) => {
    // Filter out empty optional fields and add https:// if missing
    const websites = data.websites
      .map(w => w.value)
      .filter(v => v)
      .map(url => {
        // Add https:// if no protocol is specified
        if (!url.match(/^https?:\/\//i)) {
          return `https://${url}`;
        }
        return url;
      });

    const cleanedData: ContactData = {
      firstName: data.firstName,
      lastName: data.lastName,
      emails: data.emails.map(e => e.value).filter(v => v),
      phones: data.phones.map(p => p.value).filter(v => v),
      ...(websites.length > 0 && { websites }),
      ...(data.organization && { organization: data.organization }),
      ...(data.jobTitle && { jobTitle: data.jobTitle }),
      ...(data.address && Object.values(data.address).some(v => v) && { address: data.address }),
    };

    onSubmit(cleanedData);
  };

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
    emailFields,
    appendEmail,
    removeEmail,
    phoneFields,
    appendPhone,
    removePhone,
    websiteFields,
    appendWebsite,
    removeWebsite,
  };
}
