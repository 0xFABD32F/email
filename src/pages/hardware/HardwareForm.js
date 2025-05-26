"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

// Données simulées pour les fournisseurs
const mockSuppliers = [
  { id: 1, name: "Sourcing-IT", country: "UK" },
  { id: 2, name: "Omega SO", country: "Morocco" },
  { id: 3, name: "Tech Supplies", country: "France" },
  { id: 4, name: "Global Hardware", country: "USA" },
  { id: 5, name: "Dubai Tech", country: "UAE" },
]

// Données simulées pour les clients
const mockCustomers = [
  { id: 1, name: "BT" },
  { id: 2, name: "Maroc Telecom" },
  { id: 3, name: "OCP Group" },
  { id: 4, name: "Attijariwafa Bank" },
  { id: 5, name: "Royal Air Maroc" },
]

// Données simulées pour le matériel IT & Telco
const mockHardware = [
  {
    id: 1,
    brand: "Cisco",
    supplier_id: 1,
    country: "UK",
    devis_num: "SAP050",
    customer_id: 1,
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
    supplier_id: 2,
    country: "Morocco",
    devis_num: "SAP049",
    customer_id: 2,
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
]

function HardwareForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [suppliers, setSuppliers] = useState([])
  const [customers, setCustomers] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  const [formData, setFormData] = useState({
    brand: "",
    supplier_id: "",
    country: "",
    devis_num: "",
    customer_id: "",
    pn: "",
    eq_reference: "",
    po_num: "",
    qty: 1,
    unit_cost: 0,
    currency: "USD",
    rate: 10.5,
    unit_cost_mad: 0,
    p_margin: 20,
    unit_price: 0,
    eta: "",
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API pour récupérer les fournisseurs et clients
    setTimeout(() => {
      setSuppliers(mockSuppliers)
      setCustomers(mockCustomers)

      if (isEditing) {
        // Récupérer les données de l'équipement
        const hardware = mockHardware.find((h) => h.id === Number.parseInt(id))
        if (hardware) {
          setFormData(hardware)

          // Trouver le fournisseur correspondant
          const supplier = mockSuppliers.find((s) => s.id === hardware.supplier_id)
          setSelectedSupplier(supplier)
        }
      }

      setLoading(false)
    }, 500)
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "supplier_id") {
      const supplierId = Number.parseInt(value)
      const supplier = suppliers.find((s) => s.id === supplierId)
      setSelectedSupplier(supplier)

      setFormData((prev) => ({
        ...prev,
        supplier_id: supplierId,
        country: supplier ? supplier.country : "",
      }))
    } else if (name === "unit_cost" || name === "currency" || name === "rate") {
      // Recalculer le coût unitaire en MAD
      const updatedFormData = {
        ...formData,
        [name]: value,
      }

      const unitCost = Number.parseFloat(name === "unit_cost" ? value : updatedFormData.unit_cost) || 0
      const rate = Number.parseFloat(name === "rate" ? value : updatedFormData.rate) || 1
      const unitCostMAD = updatedFormData.currency === "MAD" ? unitCost : unitCost * rate

      // Recalculer le prix unitaire avec la marge
      const margin = Number.parseFloat(updatedFormData.p_margin) || 0
      const unitPrice = unitCostMAD * (1 + margin / 100)

      setFormData({
        ...updatedFormData,
        unit_cost_mad: unitCostMAD,
        unit_price: unitPrice,
      })
    } else if (name === "p_margin") {
      // Recalculer le prix unitaire avec la nouvelle marge
      const margin = Number.parseFloat(value) || 0
      const unitCostMAD = Number.parseFloat(formData.unit_cost_mad) || 0
      const unitPrice = unitCostMAD * (1 + margin / 100)

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        unit_price: unitPrice,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simuler l'envoi des données
    console.log("Données du formulaire soumises:", formData)

    // Rediriger vers la liste des équipements
    navigate("/hardware")
  }

  if (loading) {
    return <div>Chargement des données...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{isEditing ? "Modifier" : "Ajouter"} un équipement</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="brand" className="form-label">
                  Marque
                </label>
                <select
                  id="brand"
                  name="brand"
                  className="form-select"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner une marque</option>
                  <option value="Cisco">Cisco</option>
                  <option value="HPE">HPE</option>
                  <option value="Dell">Dell</option>
                  <option value="Seagate">Seagate</option>
                  <option value="Fortinet">Fortinet</option>
                  <option value="Palo Alto">Palo Alto</option>
                  <option value="Juniper">Juniper</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="supplier_id" className="form-label">
                  Fournisseur
                </label>
                <select
                  id="supplier_id"
                  name="supplier_id"
                  className="form-select"
                  value={formData.supplier_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un fournisseur</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  Pays
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                  value={formData.country}
                  readOnly
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="devis_num" className="form-label">
                  Numéro de devis
                </label>
                <input
                  type="text"
                  id="devis_num"
                  name="devis_num"
                  className="form-control"
                  value={formData.devis_num}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="customer_id" className="form-label">
                  Client
                </label>
                <select
                  id="customer_id"
                  name="customer_id"
                  className="form-select"
                  value={formData.customer_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="pn" className="form-label">
                  Numéro de pièce (PN)
                </label>
                <input
                  type="text"
                  id="pn"
                  name="pn"
                  className="form-control"
                  value={formData.pn}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="eq_reference" className="form-label">
                  Référence équipement
                </label>
                <input
                  type="text"
                  id="eq_reference"
                  name="eq_reference"
                  className="form-control"
                  value={formData.eq_reference}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="po_num" className="form-label">
                  Numéro PO
                </label>
                <input
                  type="text"
                  id="po_num"
                  name="po_num"
                  className="form-control"
                  value={formData.po_num}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="qty" className="form-label">
                  Quantité
                </label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  className="form-control"
                  value={formData.qty}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="eta" className="form-label">
                  Date estimée d'arrivée (ETA)
                </label>
                <input
                  type="text"
                  id="eta"
                  name="eta"
                  className="form-control"
                  value={formData.eta}
                  onChange={handleChange}
                  placeholder="ex: 2W, 6W"
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="unit_cost" className="form-label">
                  Coût unitaire
                </label>
                <input
                  type="number"
                  id="unit_cost"
                  name="unit_cost"
                  className="form-control"
                  value={formData.unit_cost}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="currency" className="form-label">
                  Devise
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="form-select"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                >
                  <option value="MAD">MAD</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="rate" className="form-label">
                  Taux de change
                </label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  className="form-control"
                  value={formData.rate}
                  onChange={handleChange}
                  disabled={formData.currency === "MAD"}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="unit_cost_mad" className="form-label">
                  Coût unitaire (MAD)
                </label>
                <input
                  type="number"
                  id="unit_cost_mad"
                  name="unit_cost_mad"
                  className="form-control"
                  value={formData.unit_cost_mad}
                  readOnly
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="p_margin" className="form-label">
                  Marge (%)
                </label>
                <input
                  type="number"
                  id="p_margin"
                  name="p_margin"
                  className="form-control"
                  value={formData.p_margin}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="unit_price" className="form-label">
                  Prix unitaire
                </label>
                <input
                  type="number"
                  id="unit_price"
                  name="unit_price"
                  className="form-control"
                  value={formData.unit_price}
                  readOnly
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Mettre à jour" : "Ajouter"} l'équipement
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/hardware")}>
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

export default HardwareForm
