import { useEffect, useState, useMemo } from 'react';
import type { ContactData } from '../types';
import { deserializeContactData, generateVCard } from '../utils';
import { QRCodeDisplay } from '../components';

export function QRCodePage() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = deserializeContactData(params);

    if (!data) {
      setError('Invalid or missing contact data in URL');
    } else {
      setContactData(data);
    }
  }, []);

  // Generate VCard data
  const vcardData = useMemo(() => {
    if (!contactData) return '';
    return generateVCard(contactData);
  }, [contactData]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Error
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Go Back to Form
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your QR Code
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Scan to save contact information
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code Display */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <QRCodeDisplay data={vcardData} size={300} />

              <div className="mt-6">
                <a
                  href="/"
                  className="block w-full text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Create Another
                </a>
              </div>
            </div>

            {/* Contact Details Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Details
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span>
                  <p className="text-gray-900 dark:text-white">
                    {contactData.firstName} {contactData.lastName}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Email{contactData.emails.length > 1 ? 's' : ''}:</span>
                  {contactData.emails.map((email, index) => (
                    <p key={index} className="text-gray-900 dark:text-white">{email}</p>
                  ))}
                </div>

                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Phone{contactData.phones.length > 1 ? 's' : ''}:</span>
                  {contactData.phones.map((phone, index) => (
                    <p key={index} className="text-gray-900 dark:text-white">{phone}</p>
                  ))}
                </div>

                {contactData.organization && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Organization:</span>
                    <p className="text-gray-900 dark:text-white">{contactData.organization}</p>
                  </div>
                )}

                {contactData.jobTitle && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Job Title:</span>
                    <p className="text-gray-900 dark:text-white">{contactData.jobTitle}</p>
                  </div>
                )}

                {contactData.websites && contactData.websites.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Website{contactData.websites.length > 1 ? 's' : ''}:</span>
                    {contactData.websites.map((website, index) => (
                      <p key={index} className="text-gray-900 dark:text-white break-all">{website}</p>
                    ))}
                  </div>
                )}

                {contactData.address && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span>
                    <p className="text-gray-900 dark:text-white">
                      {contactData.address.street && <>{contactData.address.street}<br /></>}
                      {contactData.address.city && <>{contactData.address.city}, </>}
                      {contactData.address.state && <>{contactData.address.state} </>}
                      {contactData.address.postalCode && <>{contactData.address.postalCode}<br /></>}
                      {contactData.address.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
