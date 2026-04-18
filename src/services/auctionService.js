import api from "./api";

export const getAuctions = (categoryId, search, page = 1) => {
  let url = `/auctions?page=${page}`;

  if (categoryId) url += `&category_id=${categoryId}`;
  if (search) url += `&search=${search}`;

  return api.get(url);
};

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

export const getMyBids = () => {
  return api.get("/my-bids");
};