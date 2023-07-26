import axios from "axios";
const baseURL = "http://192.168.1.126:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
// ======================================================= Client API =================================================
// GET ALL TISSUE
export const getAllClient = async () => {
  const data = await axios.get(`${baseURL}/customer`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
// GET one tissue
export const getOneClient = async (id) => {
  const data = await axios.get(`${baseURL}/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};

// Create tissue
export const postClient = async (props) => {
  const data = await axios.post(
    `${baseURL}/customer`,
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

// PUT tissue
export const putClient = async (id, props) => {
  const data = await axios.put(
    `${baseURL}/customer/${id}`,
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

// DELETE tissue
export const deleteClient = async (id) => {
  const data = await axios.delete(`${baseURL}/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
