import axios from "axios";
// const baseURL=proccess.env.testBaseUrl
const baseURL = "http://192.168.1.126:2525";

const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// ================================================== Role API =================================================
// GET ALL ROLE
export const getAllRole = async () => {
  const data = await axios.get(`${baseURL}/role`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
// GET one ROLE
export const getOneRole = async (id) => {
  const data = await axios.get(`${baseURL}/role/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};

// Create ROLE
export const postRole = async (props) => {
  const data = await axios.post(
    `${baseURL}/role`,
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

// PUT ROLE
export const putRole = async (id, props) => {
  const data = await axios.put(
    `${baseURL}/role/${id}`,
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

// DELETE TISSUE
export const deleteRole = async (id) => {
  const data = await axios.delete(`${baseURL}/role/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
