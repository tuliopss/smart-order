import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id={styles.nav}>
      <Link to='/'>Smart Order</Link>

      <ul id={styles.nav_links}>
        <li>
          <NavLink to='/teachers'>Pedidos</NavLink>
        </li>

        <li>
          <NavLink to={`/students`}>Mesas</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
