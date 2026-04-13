import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createAuction } from "../services/auctionService";

export default function () {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    starting_price: "",
    reserve_price: "",
    start_date: "",
    end_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formatDate = (date) => date.replace("T", " ") + ":00";

      await createAuction(productId, {
        ...form,
        start_date: formatDate(form.start_date),
        end_date: formatDate(form.end_date),
      });

      setMessage("Auction created successfully");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.log(err);
      setMessage("Error creation auction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">
              Create Auction
            </h1>
            <p className="text-sm text-slate-500">
              Set pricing and duration for your auction
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Starting Price */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Starting Price
              </label>
              <input
                type="number"
                value={form.starting_price}
                onChange={(e) =>
                  setForm({ ...form, starting_price: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* Reserve Price */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Reserve Price
              </label>
              <input
                type="number"
                value={form.reserve_price}
                onChange={(e) =>
                  setForm({ ...form, reserve_price: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Start Date
              </label>
              <input
                type="datetime-local"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                End Date
              </label>
              <input
                type="datetime-local"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 text-white py-3 font-semibold transition hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Auction"}
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
