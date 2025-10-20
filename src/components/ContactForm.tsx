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
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactData) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
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

  const handleFormSubmit = (data: ContactFormData) => {
    // Filter out empty optional fields
    const cleanedData: ContactData = {
      firstName: data.firstName,
      lastName: data.lastName,
      emails: data.emails.map(e => e.value).filter(v => v),
      phones: data.phones.map(p => p.value).filter(v => v),
      ...(data.organization && { organization: data.organization }),
      ...(data.jobTitle && { jobTitle: data.jobTitle }),
      ...(data.website && { website: data.website }),
      ...(data.address && Object.values(data.address).some(v => v) && { address: data.address }),
    };

    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Name Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name *
            </label>
            <input
              {...register('firstName')}
              type="text"
              id="firstName"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name *
            </label>
            <input
              {...register('lastName')}
              type="text"
              id="lastName"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Contact Information
        </h3>

        {/* Emails */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email(s) *
          </label>
          {emailFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1">
                <input
                  {...register(`emails.${index}.value` as const)}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="john.doe@example.com"
                />
                {errors.emails?.[index]?.value && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.emails[index]?.value?.message}
                  </p>
                )}
              </div>
              {emailFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEmail(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                  aria-label="Remove email"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.emails && !Array.isArray(errors.emails) && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.emails.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => appendEmail({ value: '' })}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            + Add another email
          </button>
        </div>

        {/* Phones */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone(s) *
          </label>
          {phoneFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1">
                <input
                  {...register(`phones.${index}.value` as const)}
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phones?.[index]?.value && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.phones[index]?.value?.message}
                  </p>
                )}
              </div>
              {phoneFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhone(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                  aria-label="Remove phone"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.phones && !Array.isArray(errors.phones) && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phones.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => appendPhone({ value: '' })}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            + Add another phone
          </button>
        </div>
      </div>

      {/* Professional Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Professional Information
        </h3>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Organization
          </label>
          <input
            {...register('organization')}
            type="text"
            id="organization"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Job Title
          </label>
          <input
            {...register('jobTitle')}
            type="text"
            id="jobTitle"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Website
          </label>
          <input
            {...register('website')}
            type="url"
            id="website"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.website.message}
            </p>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Address (Optional)
        </h3>

        <div>
          <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Street Address
          </label>
          <input
            {...register('address.street')}
            type="text"
            id="address.street"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              City
            </label>
            <input
              {...register('address.city')}
              type="text"
              id="address.city"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="San Francisco"
            />
          </div>

          <div>
            <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              State/Province
            </label>
            <input
              {...register('address.state')}
              type="text"
              id="address.state"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="CA"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address.postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Postal Code
            </label>
            <input
              {...register('address.postalCode')}
              type="text"
              id="address.postalCode"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="94102"
            />
          </div>

          <div>
            <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country
            </label>
            <input
              {...register('address.country')}
              type="text"
              id="address.country"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="United States"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isSubmitting ? 'Generating...' : 'Generate QR Code'}
      </button>
    </form>
  );
}
