import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {

  const location = useLocation();

  // PAGES WHERE NAVBAR & FOOTER SHOULD HIDE
  const hideLayout =
    location.pathname === "/login";

  return (

    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      {!hideLayout && <Navbar />}

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      {!hideLayout && <Footer />}

    </div>
  );
};

export default MainLayout;