import axios from "axios";
const baseURL="http://192.168.1.126:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
return {};
};
// =============================================== Login User ====================================================
export const loginUser = async (props) => {
  const data = await axios.post(
    `http://192.168.1.126:2525/auth/login/admin`,
    { ...props },
    {
      Headers: {
        "Content-Type": "application/json",
        ...getAuthorizationToken(),
      },
    }
  );
  return data;
  // console.log(data)
};
