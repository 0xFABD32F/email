"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Données simulées pour les fournisseurs
const mockSuppliers = [
  {
    id: 1,
    company: "Sourcing-IT",
    domain: "Hardware IT",
    brand: "Cisco",
    country: "UK",
    contact: "John Smith",
    position: "Account Manager",
    reliability: "Élevée",
  },
  {
    id: 2,
    company: "Tech Supplies",
    domain: "Networking",
    brand: "HPE",
    country: "France",
    contact: "Marie Dubois",
    position: "Sales Director",
    reliability: "Élevée",
  },
  {
    id: 3,
    company: "Global Hardware",
    domain: "Hardware IT",
    brand: "Fortinet",
    country: "USA",
    contact: "Michael Johnson",
    position: "Regional Manager",
    reliability: "Moyenne",
  },
  {
    id: 4,
    company: "Maroc IT",
    domain: "Telco",
    brand: "Aruba",
    country: "Maroc",
    contact: "Karim Benani",
    position: "Directeur Commercial",
    reliability: "Élevée",
  },
  {
    id: 5,
    company: "Dubai Tech",
    domain: "Cybersecurity",
    brand: "Palo Alto",
    country: "UAE",
    contact: "Ahmed Al Mansouri",
    position: "Export Manager",
    reliability: "Moyenne",
  },
]

function SuppliersList() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setSuppliers(mockSuppliers)
      setLoading(false)
    }, 500)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      // Simuler la suppression
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id))
    }
  }

  const getReliabilityBadgeClass = (reliability) => {
    switch (reliability) {
      case "Élevée":
        return "badge-success"
      case "Moyenne":
        return "badge-warning"
      case "Faible":
        return "badge-danger"
      default:
        return "badge-secondary"
    }
  }

  if (loading) {
    return <div>Chargement des fournisseurs...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Fournisseurs</h1>
        <Link to="/dashboard/suppliers/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Ajouter un fournisseur
        </Link>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Société</th>
                <th>Domaine</th>
                <th>Marque</th>
                <th>Pays</th>
                <th>Contact</th>
                <th>Poste</th>
                <th>Fiabilité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.company}</td>
                  <td>{supplier.domain}</td>
                  <td>{supplier.brand}</td>
                  <td>{supplier.country}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.position}</td>
                  <td>
                    <span className={`badge ${getReliabilityBadgeClass(supplier.reliability)}`}>
                      {supplier.reliability}
                    </span>
                  </td>
                  <td>
                    <Link to={`/suppliers/edit/${supplier.id}`} className="btn btn-info btn-sm me-2">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(supplier.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SuppliersList
