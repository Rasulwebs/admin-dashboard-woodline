import axios from "axios";
const baseURL = "http://192.168.1.129:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
// ======================================================= model API =================================================
// GET ALL model
export const getAllModel = async () => {
  const data = await axios.get(`${baseURL}/model`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
// GET one model
export const getOneModel = async (id) => {
  const data = await axios.get(`${baseURL}/model/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};

// Create model
export const postModel = async (props) => {
  const data = await axios.post(
    `${baseURL}/model`,
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

// PUT model
export const putModel = async (id, props) => {
  const data = await axios.put(
    `${baseURL}/model/${id}`,
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

// DELETE model
export const deleteModel = async (id) => {
  const data = await axios.delete(`${baseURL}/model/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
