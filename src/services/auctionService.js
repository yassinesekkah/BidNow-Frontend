import api from "./api";

export const getAuctions = () => {
  return api.get("/auctions");
};