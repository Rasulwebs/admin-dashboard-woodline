import axios from "axios";

// =============================================== Login User ====================================================
export const loginUser = async (props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.post(
    `http://192.168.1.134:2525/auth/login/admin`,
    { ...props },
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
// ========================================= BRANCH API =============================================================================
export const getAllBranch = async () => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`http://192.168.1.134:2525/branch`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// GET one order
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
  const token = window.sessionStorage.getItem("token");
  const data = await axios.post(
    `http://192.168.1.134:2525/branch`,
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

// PUT BRANCH
export const putOrder = async (id, props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.put(
    `http://64.226.90.160:2525/category/${id}`,
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

// DELETE BRANCH
export const deleteOrder = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.delete(`http://64.226.90.160:2525/category/${id}`, {
    Headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// ======================================================= Category API =================================================
// GET ALL Category
export const getAllCategory = async () => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`http://192.168.1.134:2525/category`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// GET one Category
export const getOneModel = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`http://192.168.1.134:2525/category/${id}`, {
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
    `http://192.168.1.134:2525/category`,
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
    `http://192.168.1.134:2525/category/${id}`,
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
  const data = await axios.delete(`http://192.168.1.134:2525/category/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// ======================================================= Client API =================================================
// GET ALL TISSUE
export const getAllClient = async () => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`http://192.168.1.134:2525/customer`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};
// GET one tissue
export const getOneClient = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`http://192.168.1.134:2525/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// Create tissue
export const postClient = async (props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.post(
    `http://192.168.1.134:2525/customer`,
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

// PUT tissue
export const putClient = async (id, props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.put(
    `http://64.226.90.160:2525/customer/${id}`,
    { props },
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

// DELETE tissue
export const deleteClient = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.delete(`http://192.168.1.134:2525/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// ======================================================= Role API =================================================
// GET ALL ROLE
export const getAllRole = async () => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`http://64.226.90.160:2525/role`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};
// GET one ROLE
export const getOneRole = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.get(`http://64.226.90.160:2525/role/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

// Create ROLE
export const postRole = async (props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.post(
    `http://64.226.90.160:2525/role/`,
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

// PUT ROLE
export const putRole = async (id, props) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.put(
    `http://64.226.90.160:2525/role/${id}`,
    { props },
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

// DELETE ROLE
export const deleteRole = async (id) => {
  const token = window.sessionStorage.getItem("token");
  const data = await axios.delete(`http://64.226.90.160:2525/role/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
  // console.log(data)
};

