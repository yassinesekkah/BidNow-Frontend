import api from "./api"

export const createProduct = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);

    if(data.image){
        formData.append("image", data.image);
    }

    return api.post("/products", formData, {
        headers: {
            "Content-type": "multipart/form-data",
        },
    });
};