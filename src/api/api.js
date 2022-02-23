import axios from "axios";

// Online
const domain = "https://sleepy-reef-78196.herokuapp.com";
// Local
// const domain = "http://localhost:5000";

// Remove specific entry from the current list
export const removeFood = async (foodId) => {
  try {
    const response = await axios.delete(`${domain}/api/delete/${foodId}`);
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

// Delete all entries from the current list
export const deleteAll = async () => {
  try {
    const response = await axios.delete(`${domain}/api/delete-all`);
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

// Add a food entry to the current list
export const addFood = async (food) => {
  try {
    const response = await axios.post(`${domain}/api/add`, food);
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

export const fetchData = async () => {
  try {
    const response = await axios(`${domain}/api/get-list`, {
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
