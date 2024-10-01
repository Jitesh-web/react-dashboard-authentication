import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export const signup = async ({ name, surname, email, password }) => {
  try {
    const { data } = await api.post("/signup", {
      name,
      surname,
      email,
      password,
    });
    return data;
  } catch (error) {
    // Ensure you pass along the full error object to preserve the details
    if (error.response && error.response.data) {
      throw new Error(error.response.data.msg || "An error occurred");
    } else {
      throw new Error(error.message || "Network error");
    }
    //throw Error(error.response.data.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await api.post("/login", { email, password });
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.msg || "An error occurred");
    } else {
      throw new Error(error.message || "Network error");
    }
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const { data } = await api.post("/forgot-password", { email });
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.msg || "An error occurred");
    } else {
      throw new Error(error.message || "Network error");
    }
  }
};

export const resetPassword = async ({ password, token }) => {
  try {
    const { data } = await api.post(`/reset-password/${token}`, { password });
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.msg || "An error occurred");
    } else {
      throw new Error(error.message || "Network error");
    }
  }
};
