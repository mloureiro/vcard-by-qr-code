import { FormPage, QRCodePage } from './pages';

function App() {
  const pathname = window.location.pathname;

  // Simple pathname-based routing
  if (pathname === '/generate') {
    return <QRCodePage />;
  }

  // Default to form page
  return <FormPage />;
}

export default App
