import { useEffect, useState } from "react";
import api from "../services/api";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchInventory = async () => {
    const res = await api.get("/inventory");
    setItems(res.data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/inventory/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post("/inventory", form);
    }

    setForm({ name: "", stock: "", price: "" });
    fetchInventory();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/inventory/${id}`);
    fetchInventory();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          name="name"
          placeholder="Item Name"
          className="border p-2"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="border p-2"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          className="border p-2"
          value={form.price}
          onChange={handleChange}
          required
        />

        <button className="bg-black text-white px-4">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="text-center border-t">
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>₱{item.price}</td>
              <td>
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}