import axios from "axios";
// const baseURL=proccess.env.testBaseUrl
const baseURL = "http://192.168.1.129:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
// ================================================== Tissue API =================================================
// GET ALL TISSUE
export const getAllTissue = async () => {
  const data = await axios.get(`${baseURL}/tissue`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
// GET one TISSUE
export const getOneTissue = async (id) => {
  const data = await axios.get(`${baseURL}/tissue/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};

// Create TISSUE
export const postTissue = async (props) => {
  const data = await axios.post(
    `${baseURL}/tissue`,
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

// PUT TISSUE
export const putTissue = async (id, props) => {
  const data = await axios.put(
    `${baseURL}/tissue/${id}`,
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
export const deleteTissue = async (id) => {
  const data = await axios.delete(`${baseURL}/tissue/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
