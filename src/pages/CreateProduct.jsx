import { useState } from "react";
import { createProduct } from "../services/productService";

export default function CreateProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    Image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const res = await createProduct(form);

      setMessage("Product created successfully");

      console.log(res.data.product);

      //reset form
      setForm({
        title: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.log(err);
      setMessage("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Create Product
            </h1>
            <p className="text-sm text-slate-500">
              Add a new product to start your auction
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Product Title
              </label>
              <input
                type="text"
                placeholder="Enter product title..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                placeholder="Write product description..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Product Image
              </label>

              <input
                type="file"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 text-white py-3 font-semibold transition hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>

          {/* Message */}
          {message && (
            <p className="text-center text-sm font-medium text-slate-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
