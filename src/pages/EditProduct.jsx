import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";

export default function EditProduct() {
  //use params kanjibo biha mn url
  const { id } = useParams();
  //useNavigate bach kan7ato links
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    category_id: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [categories, setCategories] = useState([]);

  //fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        setForm({
          title: res.data.title,
          description: res.data.description,
          image: null,
          category_id: res.data.category_id,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category_id", form.category_id);

      if (form.image) {
        formData.append("image", form.image);
      }
      formData.append("_method", "PUT");

      await updateProduct(id, formData);

      navigate("/my-products");
    } catch (err) {
      console.log(err.response.data); 
    } finally {
      setUpdating(false);
    }
  };
  console.log(form);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="pt-8 bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>

            <p className="text-sm text-slate-500">
              Update your product information
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

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Category
              </label>

              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              >
                <option value="">Select category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
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
              disabled={updating}
              className="w-full rounded-lg bg-indigo-600 text-white py-3 font-semibold transition hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Update Product"}
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
