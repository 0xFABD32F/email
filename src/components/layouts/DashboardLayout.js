"use client"

import { useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import "./DashboardLayout.css"

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "active" : ""
  }

  // const handleLogout = () => {
  //   navigate("/")
  // }

  return (
    <div className="dashboard-layout">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <i className="fas fa-network-wired logo-icon"></i>
            <span>Oddnet CRM</span>
          </div>
          <button className="sidebar-toggle d-md-none" onClick={toggleSidebar} aria-label="Fermer le menu">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-user">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <div className="user-name">Administrateur</div>
              <div className="user-role">Super Admin</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-section-title">PRINCIPAL</div>
              <Link to="/dashboard" className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
              <Link to="/dashboard/users" className={`nav-item ${isActive("/dashboard/users")}`}>
                <i className="fas fa-users"></i>
                <span>Utilisateurs</span>
              </Link>
              <Link to="/dashboard/leads" className={`nav-item ${isActive("/dashboard/leads")}`}>
                <i className="fas fa-funnel-dollar"></i>
                <span>Leads</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">GESTION</div>
              <Link to="/dashboard/hardware" className={`nav-item ${isActive("/dashboard/hardware")}`}>
                <i className="fas fa-server"></i>
                <span>Hardware IT & Telco</span>
              </Link>
              <Link to="/dashboard/clients" className={`nav-item ${isActive("/dashboard/clients")}`}>
                <i className="fas fa-building"></i>
                <span>Clients</span>
              </Link>
              <Link to="/dashboard/suppliers" className={`nav-item ${isActive("/dashboard/suppliers")}`}>
                <i className="fas fa-truck"></i>
                <span>Fournisseurs</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">COMMERCIAL</div>
              <Link to="/dashboard/opportunities" className={`nav-item ${isActive("/dashboard/opportunities")}`}>
                <i className="fas fa-lightbulb"></i>
                <span>Opportunités</span>
              </Link>
              <Link to="/dashboard/quotes" className={`nav-item ${isActive("/dashboard/quotes")}`}>
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Devis</span>
              </Link>
              <Link to="/dashboard/supplies" className={`nav-item ${isActive("/dashboard/supplies")}`}>
                <i className="fas fa-boxes"></i>
                <span>Fournitures</span>
              </Link>
              <Link to="/dashboard/communication" className={`nav-item ${isActive("/dashboard/communication")}`}>
                <i className="fas fa-envelope"></i>
                <span>Communication</span>
              </Link>
            </div>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <header className="content-header">
          <button className="sidebar-toggle-btn d-md-none" onClick={toggleSidebar} aria-label="Ouvrir le menu">
            <i className="fas fa-bars"></i>
          </button>

          <div className="header-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Rechercher..." />
          </div>

          <div className="header-actions">
            <button className="header-action-btn" aria-label="Notifications">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <button className="header-action-btn" aria-label="Messages">
              <i className="fas fa-envelope"></i>
              <span className="badge">5</span>
            </button>
            <div className="header-user">
              <img src="/placeholder.svg?height=40&width=40" alt="Avatar" className="user-avatar" />
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>

      <div className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`} onClick={toggleSidebar}></div>
    </div>
  )
}

export default DashboardLayout