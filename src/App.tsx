import { FormPage, QRCodePage } from './pages';
import { useRoutes, ROUTES } from './hooks';

function App() {
  const { currentRoute } = useRoutes();

  // Route to appropriate page
  if (currentRoute === ROUTES.QR_GENERATOR) {
    return <QRCodePage />;
  }

  // Default to form page
  return <FormPage />;
}

export default App
