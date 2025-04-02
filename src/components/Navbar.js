import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src="/uteq.png" alt="UTEQ Logo" style={styles.logo} />
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}></Link></li>
        <li><Link to="/about" style={styles.link}></Link></li>
        <li><Link to="/contact" style={styles.link}></Link></li>
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
    height: "100px",
  },
  logo: {
    height: "100px",
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
