import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import AddForm from "./AddForm";
import FoodCategory from "./FoodCategory";

function App() {
  const defaultInputs = {
    name: "",
    category: "",
    storageLife: -1,
    expDate: moment().format("YYYY-MM-DD")
  };

  const [data, setData] = useState();
  const [input, setInput] = useState(defaultInputs);
  const [loading, setLoading] = useState(false);
  const [updateNeeded, setUpdateNeeded] = useState(true);
  const [categories, setCategories] = useState();

  const requestRefresh = () => {
    setTimeout(function () {
      setUpdateNeeded(true);
    }, 300);
  };

  const deleteAll = async () => {
    await axios
      .delete("http://localhost:4000/api/delete-all")
      .then((response) => console.log(response));

    requestRefresh();
  };

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://localhost:4000/api/data");
      response = await response.json();

      await setData(response);
      setLoading(false);
      setUpdateNeeded(false);
    }

    if (updateNeeded) {
      setLoading(true);
      fetchData();
    }
  }, [updateNeeded]);

  useEffect(() => {
    if (data) {
      setCategories([...new Set(data.foods.map((food) => food.category))]);
    }
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

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

      setInput(defaultInputs);

      requestRefresh();
    }
  }

  return (
    <div className="App">
      {loading && !data && <div>chargement</div>}

      {categories && (
        <div className="inventory">
          <div className="header">
            <h1>Inventaire</h1>
          </div>
          {categories.length > 0 ? (
            <div className="food-list">
              {categories.map((category, index) => (
                <FoodCategory
                  key={index}
                  category={category}
                  foods={data.foods}
                  onRefresh={requestRefresh}
                />
              ))}
            </div>
          ) : (
            <div className="empty-list">
              Liste vide, merci d'ajouter un élément
            </div>
          )}
        </div>
      )}

      <AddForm
        input={input}
        handleChange={handleChange}
        addFood={addFood}
        deleteAll={deleteAll}
      />
    </div>
  );
}

export default App;
