import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import Snav from "../SNav/Snav";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Layout.css"; // Import CSS for transitions

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
        document.title = 'BatCart';
    } 
    window.scrollTo(0,0)
  }, [location]);

  return (
    <>      
      {(location.pathname === "/home") || (location.pathname === "/") ? <Navbar /> : <Snav />}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
        >
          <div>
            <Outlet />
          </div>
        </CSSTransition>
      </TransitionGroup>
      
      <Footer />
    </>
  );
}
