"use client"

import { useState, useEffect } from "react"
import BarChart from "../components/chats/BarChart"
import LineChart from "../components/chats/LineChart"
import PieChart from "../components/chats/PieChart"
import StatCard from "../components/ui/StatCard"

// Simuler des données pour le dashboard
const mockData = {
  stats: {
    clients: 42,
    opportunities: 28,
    quotes: 35,
    supplies: 120,
  },
  opportunitiesByStage: {
    labels: ["Demande de devis", "Réception de devis", "Clarification", "PO reçu", "Livraison"],
    datasets: [
      {
        label: "Nombre d'opportunités",
        data: [12, 8, 5, 3, 0],
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
    ],
  },
  revenueByMonth: {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Revenus 2023",
        data: [12000, 19000, 15000, 22000, 18000, 24000, 25000, 20000, 23000, 26000, 28000, 30000],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
      },
    ],
  },
  clientsByActivity: {
    labels: ["Banque", "IT", "Pêche", "Télécommunications", "Autres"],
    datasets: [
      {
        label: "Clients par activité",
        data: [15, 10, 5, 8, 4],
        backgroundColor: [
          "rgba(37, 99, 235, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  },
}

function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div>Chargement du dashboard...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="stats-grid">
        <StatCard title="Clients" value={data.stats.clients} description="Nombre total de clients" color="#2563eb" />
        <StatCard
          title="Opportunités"
          value={data.stats.opportunities}
          description="Opportunités en cours"
          color="#f59e0b"
        />
        <StatCard title="Devis" value={data.stats.quotes} description="Devis émis" color="#10b981" />
        <StatCard title="Fournitures" value={data.stats.supplies} description="Produits en stock" color="#ef4444" />
      </div>

      <div className="grid">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Opportunités par étape</h2>
            </div>
            <BarChart data={data.opportunitiesByStage} options={{ title: "Opportunités par étape" }} />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Clients par activité</h2>
            </div>
            <PieChart data={data.clientsByActivity} options={{ title: "Clients par activité" }} />
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Revenus mensuels</h2>
            </div>
            <LineChart data={data.revenueByMonth} options={{ title: "Revenus mensuels" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard