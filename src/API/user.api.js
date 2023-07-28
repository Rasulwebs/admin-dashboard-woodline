import axios from "axios";
const baseURL = "http://192.168.1.129:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
// ======================================================= User API =================================================
// GET ALL USER
export const getAllUser = async () => {
  const data = await axios.get(`${baseURL}/user`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
// GET one USER
export const getOneUser = async (id) => {
  const data = await axios.get(`${baseURL}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};

// Create USER
export const postUser = async (props) => {
  const data = await axios.post(
    `${baseURL}/user`,
    { ...props },
    {
      headers: {
        "Content-Type": "application/json",
        ...getAuthorizationToken(),
      },
    }
  );
  return data;
  // console.log(data)
};

// PUT USER
export const putUser = async (id, props) => {
  const data = await axios.put(
    `${baseURL}/user/${id}`,
    { props },
    {
      headers: {
        "Content-Type": "application/json",
        ...getAuthorizationToken(),
      },
    }
  );
  return data;
  // console.log(data)
};

// DELETE USER
export const deleteUser = async (id) => {
  const data = await axios.delete(`${baseURL}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
