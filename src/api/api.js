import axios from "axios";

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
