// import React from 'react';
// import PropTypes from 'prop-types';

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { TransferLists } from "../../Contexts/TransferLists";
import ThemeToggler from "./ThemeToggler";
import NavSideBar from "./NavSideBar";

const Base = () => {

  const [users, setUsers] = useState([]);
  const [lightTheme, setLightTheme]=useState(false)
  const [searchQuery, setSearchQuery] = useState("All");

  const value={
    users, setUsers,
    lightTheme, setLightTheme,
    searchQuery, setSearchQuery,
  }

  return (
    <>
      <TransferLists.Provider value={value}>
          <NavSideBar>

            {/* Navbar */}
            <Header />
            {/* Page content here */}
            <Outlet />
            <Footer />
            <section className="fixed bottom-[10%] right-4 z-50">
              <ThemeToggler/>
            </section>
          </NavSideBar>

      </TransferLists.Provider>

    </>
  );
};

// Base.propTypes = {

// };

export default Base;
