"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

// Données simulées pour les clients
const mockClients = [
  { id: 1, company: "Banque Populaire" },
  { id: 2, company: "Maroc Telecom" },
  { id: 3, company: "OCP Group" },
  { id: 4, company: "Tanger Med" },
  { id: 5, company: "Royal Air Maroc" },
]

// Données simulées pour les devis
const mockQuotes = [
  {
    id: 1,
    devis_num_oddnet: "DEV-2023-001",
    devis_num_utilise: "BP-2023-001",
    client_id: 1,
    date_creation: "2023-05-10",
    statut: "Validé",
    items: [
      { id: 1, pn: "C9300-48P-E", eq_reference: "Catalyst 9300 48-port PoE+", qty: 5, unit_price: 65000 },
      { id: 2, pn: "CON-SNT-C9300PXE", eq_reference: "SNTC-8X5XNBD Catalyst 9300", qty: 5, unit_price: 12000 },
    ],
  },
  {
    id: 2,
    devis_num_oddnet: "DEV-2023-002",
    devis_num_utilise: "MT-2023-001",
    client_id: 2,
    date_creation: "2023-06-15",
    statut: "Envoyé",
    items: [
      { id: 1, pn: "P19766-B21", eq_reference: "ProLiant DL380 Gen10", qty: 2, unit_price: 100000 },
      { id: 2, pn: "P19766-B21-MEM", eq_reference: "Mémoire additionnelle 64GB", qty: 4, unit_price: 25000 },
    ],
  },
]

function QuotesForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [clients, setClients] = useState([])

  const [formData, setFormData] = useState({
    devis_num_oddnet: "",
    devis_num_utilise: "",
    client_id: "",
    date_creation: new Date().toISOString().split("T")[0],
    statut: "Brouillon",
    items: [{ id: Date.now(), pn: "", eq_reference: "", qty: 1, unit_price: 0 }],
  })

  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    // Simuler un appel API pour récupérer les clients
    setTimeout(() => {
      setClients(mockClients)

      if (isEditing) {
        // Récupérer les données du devis
        const quote = mockQuotes.find((q) => q.id === Number.parseInt(id))
        if (quote) {
          setFormData(quote)
        }
      } else {
        // Générer un numéro de devis automatique pour un nouveau devis
        setFormData((prev) => ({
          ...prev,
          devis_num_oddnet: `DEV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
        }))
      }

      setLoading(false)
    }, 500)
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleItemChange = (index, e) => {
    const { name, value } = e.target
    const updatedItems = [...formData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: name === "qty" || name === "unit_price" ? Number.parseFloat(value) : value,
    }

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), pn: "", eq_reference: "", qty: 1, unit_price: 0 }],
    }))
  }

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const updatedItems = [...formData.items]
      updatedItems.splice(index, 1)

      setFormData((prev) => ({
        ...prev,
        items: updatedItems,
      }))
    }
  }

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + item.qty * item.unit_price
    }, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simuler l'envoi des données
    console.log("Données du formulaire soumises:", formData)

    // Rediriger vers la liste des devis
    navigate("/quotes")
  }

  if (loading) {
    return <div>Chargement des données...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{isEditing ? "Modifier" : "Ajouter"} un devis</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="col-12 col-md-3">
              <div className="form-group">
                <label htmlFor="devis_num_oddnet" className="form-label">
                  N° Devis Oddnet
                </label>
                <input
                  type="text"
                  id="devis_num_oddnet"
                  name="devis_num_oddnet"
                  className="form-control"
                  value={formData.devis_num_oddnet}
                  readOnly
                />
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="form-group">
                <label htmlFor="devis_num_utilise" className="form-label">
                  N° Devis Utilisé
                </label>
                <input
                  type="text"
                  id="devis_num_utilise"
                  name="devis_num_utilise"
                  className="form-control"
                  value={formData.devis_num_utilise}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="form-group">
                <label htmlFor="client_id" className="form-label">
                  Client
                </label>
                <select
                  id="client_id"
                  name="client_id"
                  className="form-select"
                  value={formData.client_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.company}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="form-group">
                <label htmlFor="statut" className="form-label">
                  Statut
                </label>
                <select
                  id="statut"
                  name="statut"
                  className="form-select"
                  value={formData.statut}
                  onChange={handleChange}
                  required
                >
                  <option value="Brouillon">Brouillon</option>
                  <option value="Validé">Validé</option>
                  <option value="Envoyé">Envoyé</option>
                </select>
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label className="form-label">Articles du devis</label>
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>PN</th>
                        <th>Référence équipement</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="text"
                              name="pn"
                              className="form-control"
                              value={item.pn}
                              onChange={(e) => handleItemChange(index, e)}
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="eq_reference"
                              className="form-control"
                              value={item.eq_reference}
                              onChange={(e) => handleItemChange(index, e)}
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="qty"
                              className="form-control"
                              value={item.qty}
                              onChange={(e) => handleItemChange(index, e)}
                              min="1"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="unit_price"
                              className="form-control"
                              value={item.unit_price}
                              onChange={(e) => handleItemChange(index, e)}
                              min="0"
                              required
                            />
                          </td>
                          <td>{(item.qty * item.unit_price).toLocaleString()} MAD</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => removeItem(index)}
                              disabled={formData.items.length <= 1}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="text-end">
                          <strong>Total:</strong>
                        </td>
                        <td>
                          <strong>{calculateTotal().toLocaleString()} MAD</strong>
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <button type="button" className="btn btn-secondary" onClick={addItem}>
                  <i className="fas fa-plus"></i> Ajouter un article
                </button>
              </div>
            </div>

            <div className="col-12 mt-4">
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Mettre à jour" : "Ajouter"} le devis
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/quotes")}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuotesForm
