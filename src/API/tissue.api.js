
import axios from "axios";
// const baseURL=proccess.env.testBaseUrl
const baseURL="http://192.168.1.134:2525";

// ================================================== Tissue API =================================================
// GET ALL TISSUE
export const getAllTissue = async () => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.get(`${baseURL}/tissue`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // console.log(data)
  };
  // GET one TISSUE
  export const getOneTissue = async (id) => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.get(`${baseURL}/tissue/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // console.log(data)
  };
  
  // Create TISSUE
  export const postTissue = async (props) => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.post(`${baseURL}/tissue`,{ ...props },
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
  
  // PUT TISSUE
  export const putTissue = async (id, props) => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.put(
      `${baseURL}/tissue/${id}`,
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
  export const deleteTissue = async (id) => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.delete(`${baseURL}/tissue/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // console.log(data)
  };
  