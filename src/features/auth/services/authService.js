import api from "../../../services/api";

export const login = (data) => {
    return api.post("/login", data);
};

export const register = (data) => {
    return api.post("register", data);
};

export const getUser = () => {
    return api.get("/profile");
};