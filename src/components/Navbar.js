import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src="/uteq.png" alt="UTEQ Logo" style={styles.logo} />
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>
        <li><Link to="/about" style={styles.link}>Nosotros</Link></li>
        <li><Link to="/contact" style={styles.link}>Contacto</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#004080",
  },
  logoContainer: {
    height: "50px",
  },
  logo: {
    height: "50px",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  }
};

export default Navbar;
