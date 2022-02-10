import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import AddForm from "./AddForm";
import FoodInventory from "./FoodInventory";
import Footer from "./Footer";

function App() {
  // Initialize user inputs with empty name, category and set the date input to current date
  const defaultInputs = {
    name: "",
    category: "",
    storageLife: -1,
    expDate: moment().format("YYYY-MM-DD")
  };

  // Store current food list data
  const [data, setData] = useState();

  const [filteredData, setFilteredData] = useState();

  // Store changes on user inputs
  const [input, setInput] = useState(defaultInputs);
  const [loading, setLoading] = useState(false);
  const [updateNeeded, setUpdateNeeded] = useState(true);
  // Store uniques categories
  const [categories, setCategories] = useState();

  const requestRefresh = () => {
    setTimeout(function () {
      setUpdateNeeded(true);
    }, 300);
  };

  const filterData = (e) => {

const {value} = e.target;
let filteredData;

if (value === "expired") {
     filteredData = data.foods.filter(food => food.remainingDays <1 );
      setFilteredData(filteredData)
}

else if (value === "few-days") {
   filteredData = data.foods.filter(food => food.remainingDays <= 5 && food.remainingDays >= 1);

    setFilteredData(filteredData)
} else
 filteredData = data.foods;
    setFilteredData(filteredData)
  }

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://localhost:4000/api/get-list");
      response = await response.json();

      await setData(response);
      await setFilteredData(response.foods);
      setLoading(false);
      setUpdateNeeded(false);
    }

    if (updateNeeded) {
      setLoading(true);
      fetchData();
    }
  }, [updateNeeded]);

  // When data are fetched and available, create an array of unique categories from datas.foods array and store it in categories.
  useEffect(() => {
    if (filteredData) {
      setCategories([...new Set(filteredData.map((food) => food.category))]);
    }
  }, [filteredData]);

  // Handle and update user input values changes
  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  // Add a food entry to the current list
  async function addFood() {
    if (input.name && input.category) {
      const food = {
        name: input.name,
        category: input.category,
        storageLife: input.storageLife,
        expDate: moment(input.expDate).format("DD/MM/YYYY"),
        opened: false
      };
      console.log(food);
      await axios
        .post("http://localhost:4000/api/add", food)
        .then((response) => {
          console.log(response);
        });

      // Reset user inputs
      setInput(defaultInputs);

      requestRefresh();
    }
  }

  // Delete all entries
  const deleteAll = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/api/delete-all"
      );
      requestRefresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      {loading && !data && <div>chargement</div>}


      <select name="filter" id="filter" onChange={(e) => filterData(e)}>
    <option value="">All</option>
    <option value="expired">Expired</option>
    <option value="few-days">Few days left</option>
</select>

      {categories && (
        <FoodInventory
          categories={categories}
          data={filteredData}
          requestRefresh={requestRefresh}
        />
      )}

      <AddForm
        input={input}
        handleChange={handleChange}
        addFood={addFood}
        deleteAll={deleteAll}
      />

      <Footer />
    </div>
  );
}

export default App;
