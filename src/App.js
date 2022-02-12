import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import CircularProgress from "@mui/material/CircularProgress";

import Fab from "@mui/material/Fab";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

import ActionIcons from "./components/ActionIcons";
import AddForm from "./components/AddForm";
import FoodInventory from "./components/FoodInventory";
import Footer from "./components/Footer";

function App() {
  // Initialize user inputs with empty name, category and set the date input to current date
  const defaultInputs = {
    name: "",
    category: "",
    storageLife: -1,
    expDate: moment().format("YYYY-MM-DD")
  };

  const [error, setError] = useState("");

  const [successSnackbarVisible, setSuccessSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [operation, setOperation] = useState("");

  // Store current food list data
  const [data, setData] = useState();

  const [filteredData, setFilteredData] = useState();

  const [filter, setFilter] = useState("Tout");

  // Store changes on user inputs
  const [input, setInput] = useState(defaultInputs);

  const [addedFood, setAddedFood] = useState("");

  const [loading, setLoading] = useState(false);
  const [updateNeeded, setUpdateNeeded] = useState(true);
  // Store uniques categories
  const [categories, setCategories] = useState();

  const requestRefresh = () => {
    setTimeout(function () {
      setUpdateNeeded(true);
    }, 300);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const filterData = (e) => {
    let value;
    let filteredData;

    // If filter input changed
    if (e) {
      value = e.target.value;
      setFilter(value);
      // If forced filtering
    } else {
      value = filter;
    }

    if (value === "Périmé") {
      filteredData = data.foods.filter((food) => food.remainingDays < 1);
    } else if (value === "Date proche") {
      filteredData = data.foods.filter(
        (food) => food.remainingDays <= 5 && food.remainingDays >= 1
      );
    } else {
      filteredData = data.foods;
    }
    setFilteredData(filteredData);
  };

  // Fetch food list
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios("http://localhost:4000/api/get-list", {
          timeout: 1000
        });

        setData(response.data);
        setFilteredData(response.data.foods);

        setUpdateNeeded(false);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (updateNeeded) {
      setLoading(true);
      fetchData();
    }
  }, [updateNeeded]);

  // Disable scrolling when modal visible
  useEffect(() => {
    const body = document.querySelector("body");
    if (modalVisible) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [modalVisible]);

  // When data are fetched and available, create an array of unique categories from datas.foods array and store it in categories hook.
  useEffect(() => {
    if (filteredData) {
      setCategories([...new Set(filteredData.map((food) => food.category))]);
    }
  }, [filteredData]);

  // Everytime data changes (after adding or deleting an item for example), reapply filter
  useEffect(() => {
    data && filterData();
  }, [data]);

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
      const response = await axios.post("http://localhost:4000/api/add", food);

      console.log(response);

      // Store food name to display in success message
      setAddedFood(input.name);

      //

      setOperation(`${addedFood} ajouté avec succès.`);
      // Display success message
      setSuccessSnackbarVisible(true);
      // Reset user inputs
      setInput(defaultInputs);
      requestRefresh();
    }
  }

  // Delete all entries from the current list
  const deleteAll = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/api/delete-all"
      );
      // requestRefresh();
      setUpdateNeeded(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      {loading && !data && (
        <div className="loading">
          <CircularProgress sx={{ color: "#fff" }} size={70} />
          <div>Chargement de la liste</div>
        </div>
      )}

      {categories && (
        <FoodInventory
          categories={categories}
          data={filteredData}
          requestRefresh={requestRefresh}
          filter={filter}
          filterData={filterData}
          setError={setError}
          setSuccessSnackbarVisible={setSuccessSnackbarVisible}
          setOperation={setOperation}
        />
      )}

      {error && (
        <>
          <div className="inventory"></div>
          <Snackbar open>
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          </Snackbar>
        </>
      )}

      <Snackbar
        open={successSnackbarVisible}
        autoHideDuration={3000}
        onClose={() => {
          setSuccessSnackbarVisible(false);
        }}
      >
        <Alert severity="success" variant="filled">
          {operation}
        </Alert>
      </Snackbar>

      <ActionIcons
        deleteAll={deleteAll}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      {modalVisible && (
        <div className="modal">
          <Fab
            color="primary"
            aria-label="add"
            className="close-modal"
            onClick={() => setModalVisible(!modalVisible)}
          >
            <CloseIcon />
          </Fab>
          <AddForm
            input={input}
            handleChange={handleChange}
            addFood={addFood}
            deleteAll={deleteAll}
            closeModal={closeModal}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
