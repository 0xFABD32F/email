"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Données simulées pour les fournitures
const mockSupplies = [
  {
    id: 1,
    brand: "Cisco",
    supplier: "Sourcing-IT",
    country: "UK",
    devis_num: "DEV-2023-001",
    customer: "Banque Populaire",
    pn: "C9300-48P-E",
    eq_reference: "Catalyst 9300 48-port PoE+",
    po_num: "PO-2023-001",
    qty: 5,
    unit_cost: 5000,
    currency: "USD",
    rate: 10.2,
    unit_cost_mad: 51000,
    p_margin: 30,
    unit_price: 6500,
    eta: "2023-06-15",
  },
  {
    id: 2,
    brand: "HPE",
    supplier: "Tech Supplies",
    country: "France",
    devis_num: "DEV-2023-002",
    customer: "Maroc Telecom",
    pn: "P19766-B21",
    eq_reference: "ProLiant DL380 Gen10",
    po_num: "PO-2023-002",
    qty: 2,
    unit_cost: 8000,
    currency: "EUR",
    rate: 11.0,
    unit_cost_mad: 88000,
    p_margin: 25,
    unit_price: 10000,
    eta: "2023-07-20",
  },
  {
    id: 3,
    brand: "Fortinet",
    supplier: "Global Hardware",
    country: "USA",
    devis_num: "DEV-2023-003",
    customer: "OCP Group",
    pn: "FG-100F",
    eq_reference: "FortiGate 100F",
    po_num: "PO-2023-003",
    qty: 3,
    unit_cost: 4000,
    currency: "USD",
    rate: 10.2,
    unit_cost_mad: 40800,
    p_margin: 35,
    unit_price: 5400,
    eta: "2023-08-10",
  },
  {
    id: 4,
    brand: "Aruba",
    supplier: "Maroc IT",
    country: "Maroc",
    devis_num: "DEV-2023-004",
    customer: "Tanger Med",
    pn: "JL320A",
    eq_reference: "Aruba 2930F 48G PoE+",
    po_num: "PO-2023-004",
    qty: 10,
    unit_cost: 30000,
    currency: "MAD",
    rate: 1,
    unit_cost_mad: 30000,
    p_margin: 20,
    unit_price: 36000,
    eta: "2023-09-05",
  },
  {
    id: 5,
    brand: "Palo Alto",
    supplier: "Dubai Tech",
    country: "UAE",
    devis_num: "DEV-2023-005",
    customer: "Royal Air Maroc",
    pn: "PA-3260",
    eq_reference: "PA-3260 Firewall",
    po_num: "PO-2023-005",
    qty: 1,
    unit_cost: 15000,
    currency: "USD",
    rate: 10.2,
    unit_cost_mad: 153000,
    p_margin: 25,
    unit_price: 191250,
    eta: "2023-10-15",
  },
]

function SuppliesList() {
  const [supplies, setSupplies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setSupplies(mockSupplies)
      setLoading(false)
    }, 500)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette fourniture ?")) {
      // Simuler la suppression
      setSupplies(supplies.filter((supply) => supply.id !== id))
    }
  }

  if (loading) {
    return <div>Chargement des fournitures...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Fournitures</h1>
        <Link to="/dashboard/supplies/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Ajouter une fourniture
        </Link>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Référence</th>
                <th>Client</th>
                <th>Fournisseur</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Marge</th>
                <th>ETA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => (
                <tr key={supply.id}>
                  <td>{supply.brand}</td>
                  <td>{supply.eq_reference}</td>
                  <td>{supply.customer}</td>
                  <td>{supply.supplier}</td>
                  <td>{supply.qty}</td>
                  <td>{supply.unit_price.toLocaleString()} MAD</td>
                  <td>{supply.p_margin}%</td>
                  <td>{supply.eta}</td>
                  <td>
                    <Link to={`/supplies/edit/${supply.id}`} className="btn btn-info btn-sm me-2">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(supply.id)}>
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

export default SuppliesList
