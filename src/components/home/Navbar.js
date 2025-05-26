"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/">
              <h1>OddnetCRM</h1>
            </Link>
          </div>

          <div className="navbar-menu-toggle" onClick={toggleMobileMenu}>
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>

          <ul className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <li className="navbar-item">
              <a
                href="#features"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("features")
                }}
              >
                Fonctionnalités
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#pricing"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("pricing")
                }}
              >
                Tarifs
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#why-us"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("why-us")
                }}
              >
                Pourquoi nous
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#contact"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("contact")
                }}
              >
                Contact
              </a>
            </li>
          </ul>

          <div className={`navbar-actions ${isMobileMenuOpen ? "open" : ""}`}>
            <Link to="/login" className="navbar-login">
              Se connecter
            </Link>
            <Link to="/register" className="btn btn-primary">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar