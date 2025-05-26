"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Données simulées pour les devis
const mockQuotes = [
  {
    id: 1,
    devis_num_oddnet: "DEV-2023-001",
    devis_num_utilise: "BP-2023-001",
    client: "Banque Populaire",
    date_creation: "2023-05-10",
    statut: "Validé",
    montant_total: 1250000,
  },
  {
    id: 2,
    devis_num_oddnet: "DEV-2023-002",
    devis_num_utilise: "MT-2023-001",
    client: "Maroc Telecom",
    date_creation: "2023-06-15",
    statut: "Envoyé",
    montant_total: 1500000,
  },
  {
    id: 3,
    devis_num_oddnet: "DEV-2023-003",
    devis_num_utilise: "OCP-2023-001",
    client: "OCP Group",
    date_creation: "2023-07-05",
    statut: "Brouillon",
    montant_total: 800000,
  },
  {
    id: 4,
    devis_num_oddnet: "DEV-2023-004",
    devis_num_utilise: "TM-2023-001",
    client: "Tanger Med",
    date_creation: "2023-08-01",
    statut: "Validé",
    montant_total: 600000,
  },
  {
    id: 5,
    devis_num_oddnet: "DEV-2023-005",
    devis_num_utilise: "RAM-2023-001",
    client: "Royal Air Maroc",
    date_creation: "2023-09-10",
    statut: "Envoyé",
    montant_total: 350000,
  },
]

function QuotesList() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setQuotes(mockQuotes)
      setLoading(false)
    }, 500)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce devis ?")) {
      // Simuler la suppression
      setQuotes(quotes.filter((quote) => quote.id !== id))
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Brouillon":
        return "badge-secondary"
      case "Validé":
        return "badge-success"
      case "Envoyé":
        return "badge-primary"
      default:
        return "badge-info"
    }
  }

  if (loading) {
    return <div>Chargement des devis...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Devis</h1>
        <Link to="/dashboard/quotes/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Ajouter un devis
        </Link>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>N° Devis Oddnet</th>
                <th>N° Devis Utilisé</th>
                <th>Client</th>
                <th>Date de création</th>
                <th>Statut</th>
                <th>Montant total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id}>
                  <td>{quote.devis_num_oddnet}</td>
                  <td>{quote.devis_num_utilise}</td>
                  <td>{quote.client}</td>
                  <td>{quote.date_creation}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(quote.statut)}`}>{quote.statut}</span>
                  </td>
                  <td>{quote.montant_total.toLocaleString()} MAD</td>
                  <td>
                    <Link to={`/quotes/edit/${quote.id}`} className="btn btn-info btn-sm me-2">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(quote.id)}>
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

export default QuotesList
