import { useEffect, useState } from "react";
import api from "../services/api";
import { deleteProduct, getMyProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  /// hanta m3a lfetch faker dima fhad 3 etaps
  // 1- state fin n sayviw l products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // 2- async bach nkhadmo b await bach hta yfetchi 3ad ykamel lcode
  const fetchProducts = async () => {
    try {
      const res = await getMyProducts();
      //man ba3d lfetch nsayviwhoum f state products
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //3- [] bach effect kayekhdam ghi lmera lewla mnin kaydir l compenent render
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteProduct(id);

      fetchProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={product.image_url}
                className="h-40 w-full object-cover rounded mb-3"
              />

              <h2 className="font-semibold">{product.title}</h2>

              <div className="flex justify-between mt-3">
                <button
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  className="
                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                        bg-blue-50 text-blue-600
                        hover:bg-blue-100 hover:text-blue-700
                        transition-all duration-200
                    "
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                        transition-all duration-200
                        ${
                        deletingId === product.id
                            ? "bg-red-100 text-red-400 cursor-not-allowed"
                            : "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                        }
                    `}
                >
                  {deletingId === product.id ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>🗑 Delete</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
