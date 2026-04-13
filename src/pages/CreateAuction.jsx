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
    <div>
      <h1>Create Auction</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Starting Price"
          value={form.starting_price}
          onChange={(e) => setForm({ ...form, starting_price: e.target.value })}
        />

        <input
          type="number"
          placeholder="Reserve Price"
          value={form.reserve_price}
          onChange={(e) => setForm({ ...form, reserve_price: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Auction"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
