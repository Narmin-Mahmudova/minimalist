import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { routes } from './routes/routesConfig';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
          <Footer />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;