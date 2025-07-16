
import '../src/styles/App.css'
// ייבוא קומפוננטות
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Header from './Components/HeaderComponents/Header.jsx'
import Footer from './Components/FooterComponents/Footer.jsx'
import Home from './Components/HomeComponents/Home.jsx'
import Category from './Components/CategoryComponents/Category.jsx'
import Login from './Components/LoginComponents/Login.jsx'
import PaymantDetails from './Components/PaymentComponents/PaymantDetails.jsx'
import PersonalDetails from './Components/PaymentComponents/Personaldetails.jsx'
import ShippingDetails from './Components/PaymentComponents/ShippingDetails.jsx'
import OrderConfirmation from './Components/PaymentComponents/OrderConfirmation.jsx'
import ScrollToTop from './Components/otherComponents/ScrolToApp.jsx'
import ProductDetails from './Components/CategoryComponents/ProductDetails.jsx'
import TermsOfUse from './Components/FooterComponents/TermsOfUse.jsx'
import ShippingPolicy from './Components/FooterComponents/ShiooingPolicy.jsx';
import PrivacyPolicy from './Components/FooterComponents/PrivacyPolicy.jsx';
import ReturnPolicy from './Components/FooterComponents/ReturnPolicy.jsx';
import AccessibilityStatement from './Components/FooterComponents/AccessibilityStatement.jsx';
import ContactPage from './Components/FooterComponents/Contact.jsx';
import ShoppingCart from './Components/ShopeCartComponents/ShoppingCart .jsx';
import SignUp from './Components/LoginComponents/SignUp.jsx';
import BestSellers from './Components/HomeComponents/BestSellers.jsx';
import AdminPage from './Components/AdminComponents/AdminPage.jsx';
import ViewData from './Components/AdminComponents/ViewData.jsx';
import UserProfile from './Components/UserData/UserProfile.jsx';
import UserOrders from './Components/UserData/UserOrders.jsx'
import UpdateUser from './Components/UserData/UpdateUser.jsx';
// פונקציות
import { getAllProducts } from './APIs/Products.js';
import {  getMyOrders } from './APIs/Orders.js';
import { getAllCategories } from './APIs/Categories.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCategories } from './Persist-redux/categoriesSlice.js';
import { setProducts } from './Persist-redux/productsSlice.js';
import {  fetchCart } from './Persist-redux/cartSlice.js';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
// קומפוננטה שתמיד על המסך 
// מכילה את המסגרת הקבועה לכל העמודים
//Root  זה המקום שאיליו נטענות הקומפוננטות באופן דינאמי לתוך  Outletה 
export function Root() {



  const dispatch = useDispatch();
  const { categories, products } = useLoaderData(); // מקבל את הנתונים מהלודר
  const loggedIn = useSelector(state => state.user.loggedIn);
  // const location = window.location; // מקבל את הכתובת הנוכחית של הדפדפן
  const location = useLocation();


  useEffect(() => {
    dispatch(setCategories(categories));
    dispatch(setProducts(products));

  }, []);


  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchCart())
    }
  }, [dispatch, loggedIn]);

  const isHome = location.pathname === '/';

  const inkRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ניהול גלילה רק בדף הבית
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      if (!inkRef.current) return;

      const rect = inkRef.current.getBoundingClientRect();
      const headerHeight = 80;
      const progress = Math.min(Math.max((headerHeight - rect.top) / rect.height, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrolledPastInk = scrollProgress >= 1;


  return (
    <>
      <Header scrolledPastInk={scrolledPastInk} />
      {/* <Nav /> */}
      <ScrollToTop />
    {isHome && (
  <div
    id="ink-zone"
    style={{
      position: 'relative',
      marginTop: 0,
      height: 'calc(100vh - 80px)',
      width: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      backgroundColor: '#c59d2f',
      backgroundImage: 'url(/images/girls/8587128e-a089-4971-93aa-cc3a9ecf4562.jpg)', // שימי את הנתיב האמיתי
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  />
)}

      <main className="content" >


        <Outlet />
      </main>
      <Footer />
    </>
  )
}

// // יצירת טבלת ניתוב
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: async () => {

      const categories = await getAllCategories();
      const products = await getAllProducts();

      return { categories, products };
    },
    children: [
      {

        path: '/category/:id',
        element: <Category />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },

      {
        path: '/shopeCart',
        element: <ShoppingCart />,
      }
      ,
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/bestSellers',
        element: <BestSellers />,
      },
      {
        path: '/paymaentDetails',
        element: <PaymantDetails />,
      },
      {
        path: '/personalDetails',
        element: <PersonalDetails />,
      },
      {
        path: '/shippingDetails',
        element: <ShippingDetails />,
      },
      {
        path: '/orderConfirmation',
        element: <OrderConfirmation />,
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,

      },
      {
        path: '/termsOfUse',
        element: <TermsOfUse />,
      },
      {
        path: '/shippingPolicy',
        element: <ShippingPolicy />,
      },
      {
        path: '/privacyPolicy',
        element: < PrivacyPolicy />,
      },
      {
        path: '/returnPolicy',
        element: < ReturnPolicy />,
      },
      {
        path: '/accessibilityStatement',
        element: < AccessibilityStatement />,
      },
      {
        path: '/contact',
        element: < ContactPage />,
      }
      ,
      {
        path: '/adminPage',
        element: < AdminPage />,
      },
      {
        path: '/viewData',
        element: < ViewData />,
      },
      {
        path: '/userProfile',
        element: < UserProfile />,
      },
      {
        path: '/updateUser',
        element: < UpdateUser />,
      },
      {
        path: '/userOrders',
        element: < UserOrders />,
        loader: async () => {
          try {
            const orders = await getMyOrders();
            return { orders };
          } catch (error) {
            console.error('Error fetching user orders:', error);
            return { orders: [] }; // במקרה של שגיאה, מחזיר מערך ריק
          }
        }
      }

    ]
  }])

function App() {


  return (
    <>


      <RouterProvider router={router} />

    </>
  )
}
export default App;
