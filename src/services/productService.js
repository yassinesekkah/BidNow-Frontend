import api from "./api"

export const createProduct = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category_id", data.category_id);

    if(data.image){
        formData.append("image", data.image);
    }

    return api.post("/products", formData, {
        headers: {
            "Content-type": "multipart/form-data",
        },
    });
};

export const getMyProducts = () => {
  return api.get("/my-products");
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const getProductById = (id) => {
    return api.get(`/products/${id}`);
}

export const updateProduct = (id, data) => {

  return api.post(`/products/${id}`, data);
};