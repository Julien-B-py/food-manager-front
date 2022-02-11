import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import AddForm from "./components/AddForm";
import FoodInventory from "./components/FoodInventory";
import Footer from "./components/Footer";
import CssTextField from "./components/CssTextField";

import { filters } from "./constants/constants";

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
    const { value } = e.target;
    let filteredData;
    setFilter(value);
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
        <div className="filter">
          <CssTextField
            sx={{ width: "20ch" }}
            name="filter"
            select
            label="Filtrer"
            value={filter}
            onChange={(e) => filterData(e)}
          >
            {filters.map((filter) => (
              <MenuItem key={filter} value={filter}>
                {filter}
              </MenuItem>
            ))}
          </CssTextField>
        </div>
      )}

      {error && (
        <>
        <div className="inventory">
        </div>
        <Snackbar open>
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        </Snackbar>
        </>
      )}

      {categories && (
        <FoodInventory
          categories={categories}
          data={filteredData}
          requestRefresh={requestRefresh}
        />
      )}

      <Snackbar
        open={successSnackbarVisible}
        autoHideDuration={3000}
        onClose={() => {
          setSuccessSnackbarVisible(false);
        }}
      >
        <Alert severity="success" variant="filled">
          {addedFood} ajouté avec succès.
        </Alert>
      </Snackbar>

      <div className="action-icons">
        <Fab
          color="primary"
          aria-label="add"
          className="delete-all-button"
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete all items?")) {
              deleteAll();
            }
          }}
        >
          <DeleteIcon />
        </Fab>

        <Fab
          color="primary"
          aria-label="add"
          className="add-button"
          onClick={() => setModalVisible(!modalVisible)}
        >
          <AddIcon />
        </Fab>
      </div>

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
