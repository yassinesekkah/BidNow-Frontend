import api from "../../../services/api";

export const getNotifications = () => {
  return api.get("/notifications");
};

export const markAsRead = (id) => {
  return api.post(`/notifications/${id}/read`);
};