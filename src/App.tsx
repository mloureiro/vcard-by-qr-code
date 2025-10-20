import { FormPage, QRCodePage, NotFoundPage } from './pages';
import { useRoutes, ROUTES } from './hooks';

function App() {
  const { currentRoute, isValidRoute } = useRoutes();

  // Show 404 page for invalid routes
  if (!isValidRoute) {
    return <NotFoundPage />;
  }

  // Route to appropriate page
  if (currentRoute === ROUTES.QR_GENERATOR) {
    return <QRCodePage />;
  }

  // Default to form page
  return <FormPage />;
}

export default App
