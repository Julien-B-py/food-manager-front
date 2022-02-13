import axios from "axios";

// Remove specific entry from the current list
export const removeFood = async (foodId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/delete/${foodId}`
    );
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

// Delete all entries from the current list
export const deleteAll = async () => {
  try {
    const response = await axios.delete("http://localhost:4000/api/delete-all");
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

// Add a food entry to the current list
export const addFood = async (food) => {
  try {
    const response = await axios.post("http://localhost:4000/api/add", food);
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

export const fetchData = async () => {
  try {
    const response = await axios("http://localhost:4000/api/get-list", {
      timeout: 1000
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
