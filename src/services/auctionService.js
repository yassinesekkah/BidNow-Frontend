import api from "./api";

export const getAuctions = () => api.get("/auctions");

///mnin kaykon 3endna parametre fel path kankhadmo b `` machi l ""
export const getAuction = (id) => {
    return api.get(`/auctions/${id}`);
}

export const placeBid = (id, data) => {
  return api.post(`/auctions/${id}/bids`, data);
};

export const createAuction = (productId, data) => {
  return api.post(`/products/${productId}/auction`, data);
};