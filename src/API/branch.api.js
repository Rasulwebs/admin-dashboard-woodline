import axios from "axios";
const baseURL = "http://192.168.1.129:2525";
const getAuthorizationToken = () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// ========================================= BRANCH API =============================================================================

// GET ALL BRANCH
export const getAllBranch = async () => {
  const data = await axios.get(`${baseURL}/branch`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};

// GET one BRANCH
// export const getOneCategory = async (id) => {
//   const token = window.sessionStorage.getItem("token");
//   const data = await axios.get(`http://64.226.90.160:2525/category/${id}`, {
//     Headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
//   // console.log(data)
// };

// Create BRANCH
export const postBranch = async (props) => {
  const data = await axios.post(
    `${baseURL}/branch`,
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

// PUT BRANCH
export const putOrder = async (id, props) => {
  const data = await axios.put(
    `${baseURL}/branch/${id}`,
    { props },
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

// DELETE BRANCH
export const deleteOrder = async (id) => {
  const data = await axios.delete(`${baseURL}/branch/${id}`, {
    Headers: {
      "Content-Type": "application/json",
      ...getAuthorizationToken(),
    },
  });
  return data;
  // console.log(data)
};
