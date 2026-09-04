import Home from '../pages/Home';
import Shop from '../pages/Shop';      
import BestSellers from '../pages/BestSellers';      
import BabyCare from '../pages/BabyCare';      
import AIAssistants from '../pages/AIAssistants';      
import About from '../pages/About';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import BathBody from '../pages/BathBody';
import Lip from '../pages/Lip';
import NewLaunches from '../pages/NewLaunches';
import Hair from '../pages/Hair';
import Skin from '../pages/Skin';
import Detail from '../pages/Detail';
import InfoPage from '../pages/InfoPage';
import Login from '../pages/Login';
import ContactForm from '../pages/ContactForm';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/best-sellers', element: <BestSellers /> },
  { path: '/skin-care', element: <Skin /> },
  { path: '/baby-care', element: <BabyCare /> },
  { path: '/hair-care', element: <Hair /> },
  { path: '/ai-assistants', element: <AIAssistants /> },
  { path: '/track-order', element: <About /> },
  { path: '/cart', element: <Cart /> },
  { path: '/wishlist', element: <Wishlist /> },
  { path: '/bath-body', element: <BathBody /> },
  { path: '/lip', element: <Lip /> },
  { path: '/new-launches', element: <NewLaunches /> },
  { path: '/hair', element: <Hair /> },
  { path: '/skin', element: <Skin /> },
  { path: '/product', element: <Detail /> },
  { path: '/about', element: <About /> },
  { path: '/info/:slug', element: <InfoPage /> },
  { path: '/login', element: <Login /> },
  { path: '/contact-form', element: <ContactForm /> },
];