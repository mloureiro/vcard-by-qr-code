import { useState } from 'react';
import { ContactForm } from './components';
import type { ContactData } from './types';

function App() {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  const handleFormSubmit = (data: ContactData) => {
    console.log('Contact data submitted:', data);
    setContactData(data);
    // TODO: Generate QR code with this data
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            QR Code Links
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Generate QR codes for easy contact sharing
          </p>
        </header>
        <main className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <ContactForm onSubmit={handleFormSubmit} />
          </div>

          {contactData && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Preview
              </h2>
              <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                {JSON.stringify(contactData, null, 2)}
              </pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App
