import { FormPage, QRCodePage } from './pages';

function App() {
  const pathname = window.location.pathname;
  const basePath = import.meta.env.BASE_URL;

  // Simple pathname-based routing
  // Remove base path from pathname for comparison
  const route = pathname.replace(basePath, '/').replace(/^\/+/, '/');

  if (route === '/generate') {
    return <QRCodePage />;
  }

  // Default to form page
  return <FormPage />;
}

export default App
