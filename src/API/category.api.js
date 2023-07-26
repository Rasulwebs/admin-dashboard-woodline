import axios from "axios";
const baseURL = "http://192.168.1.126:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// ======================================================= Category API =================================================
// GET ALL Category
export const getAllCategory = async () => {
  const data = await axios.get(`${baseURL}/category`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};

// GET one Category
export const getOneModel = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`${baseURL}/category/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// Create Category
export const postCategory = async (props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.post(
    `${baseURL}/category`,
    { ...props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
  // console.log(data)
};

// PUT Category
export const putCategory = async (id, props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.put(
    `${baseURL}/category/${id}`,
    { props },
    {
      Headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
  // console.log(data)
};

// DELETE Category
export const deleteCategory = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.delete(`${baseURL}/category/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};
