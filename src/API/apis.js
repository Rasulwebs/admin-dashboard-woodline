import axios from "axios";
const baseURL = "http://192.168.1.129:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
// =============================================== Login User ====================================================
export const loginUser = async (props) => {
  try {
    const data = await axios.post(
      `http://192.168.1.129:2525/auth/login/admin`,
      { ...props },
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthorizationToken(),
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
