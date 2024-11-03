import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/layout/Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import ForgotPassword from "./Components/Indentify/ForgotPassword";
import EnterCode from "./Components/Indentify/EnterCode";
import Restpassword from "./Components/Indentify/Restpassword";
import OurProdcuts from "./Components/Products/Prodcuts";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProdectDetails from "./Components/ProdectDetails/ProdectDetails";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/brands/Brands";
import GetSpecificCateg from "./Components/GetSpecificBrandorCateg/GetSpecificBrandorCateg";
import GetSpecificBrand from "./Components/Getspecificbrand/Getspecificbrand";
import Cart from "./Components/Cart/Cart";
import ProfileLayout from "./Components/layout/ProfileLayout";
import Profile from "./Components/Profile/Profile";
import Address from "./Components/Address/Address";
import Orders from "./Components/Orders/Orders";
import toast, { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import { Offline } from "react-detect-offline";

function App() {
  const myrouter = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forgotPassword", element: <ForgotPassword /> },
        { path: "/entercode", element: <EnterCode /> },
        { path: "/restpassword", element: <Restpassword /> },
        {
          path: "/ourproducts",
          element: (
            <ProtectedRoute>
              <OurProdcuts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Prodectdetails/:id",
          element: (
            <ProtectedRoute>
              <ProdectDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/getspecificcateg/:categ",
          element: (
            <ProtectedRoute>
              <GetSpecificCateg />
            </ProtectedRoute>
          ),
        },
        {
          path: "/getspecificbrand/:brand",
          element: (
            <ProtectedRoute>
              <GetSpecificBrand />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Profile",
          element: <ProfileLayout />,
          children: [
            {
              path: "/Profile",
              element: (
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              ),
            },
            {
              path: "/Profile/address",
              element: (
                <ProtectedRoute>
                  <Address />
                </ProtectedRoute>
              ),
            },
            {
              path: "/Profile/allorders",
              element: (
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "/checkout/:id",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={myrouter} />
      </QueryClientProvider>
      <Toaster />
        <Offline>
          <div className="position-fixed offlineText z-3 w-100 bg-transparent">
            <div className="alert alert-danger w-100 p-0">
              <h4 className="alert-link text-center">
                Check Your Network Connection
              </h4>
            </div>
          </div>
        </Offline>
    </>
  );
}

export default App;
