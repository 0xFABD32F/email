"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Données simulées pour le matériel IT & Telco
const mockHardware = [
  {
    id: 1,
    brand: "Cisco",
    supplier: "Sourcing-IT",
    country: "UK",
    devis_num: "SAP050",
    customer: "BT",
    pn: "C9300-48UN-A",
    eq_reference: "Catalyst 9300 48-port 55Gbps Network Advantage",
    po_num: "CW9161-ROW",
    qty: 2,
    unit_cost: 6074,
    currency: "USD",
    rate: 10.5,
    unit_cost_mad: 63777,
    p_margin: 30,
    unit_price: 82910.1,
    eta: "2W",
  },
  {
    id: 2,
    brand: "HPE",
    supplier: "Omega SO",
    country: "Morocco",
    devis_num: "SAP049",
    customer: "Maroc Telecom",
    pn: "S0U52A",
    eq_reference: "HPE Aruba Networking User Experience Insight Sensor 60GHz",
    po_num: "H6048AE",
    qty: 5,
    unit_cost: 53,
    currency: "USD",
    rate: 10.5,
    unit_cost_mad: 556.5,
    p_margin: 25,
    unit_price: 695.63,
    eta: "6W",
  },
  {
    id: 3,
    brand: "Seagate",
    supplier: "Tech Supplies",
    country: "France",
    devis_num: "SAP051",
    customer: "OCP Group",
    pn: "ST8000NM0055",
    eq_reference: "Seagate Enterprise 8TB HDD SATA 6Gb/s",
    po_num: "ST8000-OCP",
    qty: 10,
    unit_cost: 320,
    currency: "EUR",
    rate: 11.2,
    unit_cost_mad: 3584,
    p_margin: 20,
    unit_price: 4300.8,
    eta: "3W",
  },
  {
    id: 4,
    brand: "Fortinet",
    supplier: "Sourcing-IT",
    country: "UK",
    devis_num: "SAP052",
    customer: "Attijariwafa Bank",
    pn: "FG-100F",
    eq_reference: "FortiGate 100F Next Generation Firewall",
    po_num: "FG100F-AWB",
    qty: 2,
    unit_cost: 4500,
    currency: "USD",
    rate: 10.5,
    unit_cost_mad: 47250,
    p_margin: 35,
    unit_price: 63787.5,
    eta: "4W",
  },
  {
    id: 5,
    brand: "Dell",
    supplier: "Omega SO",
    country: "Morocco",
    devis_num: "SAP053",
    customer: "Royal Air Maroc",
    pn: "R740-RAM",
    eq_reference: "Dell PowerEdge R740 Server",
    po_num: "R740-RAM-01",
    qty: 1,
    unit_cost: 8500,
    currency: "USD",
    rate: 10.5,
    unit_cost_mad: 89250,
    p_margin: 15,
    unit_price: 102637.5,
    eta: "8W",
  },
]

function HardwareList() {
  const [hardware, setHardware] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setHardware(mockHardware)
      setLoading(false)
    }, 500)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet équipement ?")) {
      // Simuler la suppression
      setHardware(hardware.filter((item) => item.id !== id))
    }
  }

  const formatCurrency = (value, currency) => {
    return `${value.toLocaleString()} ${currency}`
  }

  if (loading) {
    return <div>Chargement des équipements...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Hardware IT & Telco</h1>
        <Link to="/dashboard/hardware/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Ajouter un équipement
        </Link>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Référence</th>
                <th>Fournisseur</th>
                <th>Client</th>
                <th>N° Devis</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Marge</th>
                <th>ETA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hardware.map((item) => (
                <tr key={item.id}>
                  <td>{item.brand}</td>
                  <td>{item.eq_reference}</td>
                  <td>{item.supplier}</td>
                  <td>{item.customer}</td>
                  <td>{item.devis_num}</td>
                  <td>{item.qty}</td>
                  <td>{formatCurrency(item.unit_price, "MAD")}</td>
                  <td>{item.p_margin}%</td>
                  <td>{item.eta}</td>
                  <td>
                    <Link to={`/hardware/edit/${item.id}`} className="btn btn-info btn-sm me-2">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
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

export default HardwareList
