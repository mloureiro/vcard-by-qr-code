import { ContactForm } from '../components';
import type { ContactData } from '../types';
import { serializeContactData } from '../utils';

export function FormPage() {
  const handleFormSubmit = (data: ContactData) => {
    const params = serializeContactData(data);
    const basePath = import.meta.env.BASE_URL;
    window.location.href = `${basePath}generate?${params.toString()}`;
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
        </main>
      </div>
    </div>
  );
}
