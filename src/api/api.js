import axios from "axios";

// Online
const domain = "https://sleepy-reef-78196.herokuapp.com";
// Local
// const domain = "http://localhost:5000";

// Remove specific entry from the current list
export const removeFood = async (foodId) => {
  try {
    const response = await axios.delete(`${domain}/api/foods/${foodId}`);
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

// Delete all entries from the current list
export const deleteAll = async () => {
  try {
    const response = await axios.delete(`${domain}/api/foods`);
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

// Add a food entry to the current list
export const addFood = async (food) => {
  try {
    const response = await axios.post(`${domain}/api/foods`, food);
    return response.data.response;
  } catch (error) {
    return error.message;
  }
};

// Edit a food entry from the current list
export const editFood = async (foodId, food) => {
  try {
    const response = await axios.patch(`${domain}/api/foods/${foodId}`, food);
    return response.data.message;
  } catch (error) {
    return error.message;
  }
};



// Get the current list containing all food items
export const fetchData = async () => {
  try {
    const response = await axios(`${domain}/api/foods`, {
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
