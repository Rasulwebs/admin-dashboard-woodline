
import axios from "axios";
// const baseURL=proccess.env.testBaseUrl
const baseURL="http://192.168.1.134:2525";

// ================================================== Role API =================================================
// GET ALL ROLE
export const getAllRole = async () => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.get(`${baseURL}/role`, {
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
    const data = await axios.get(`${baseURL}/role/${id}`, {
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
    const data = await axios.post(`${baseURL}/role`,{ ...props },
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
      `${baseURL}/role/${id}`,
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
  
  // DELETE TISSUE
  export const deleteRole = async (id) => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.delete(`${baseURL}/role/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // console.log(data)
  };
  