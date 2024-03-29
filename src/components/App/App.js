import { useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import moment from "moment";

import { fetchData, fetchSuggestions } from "#api/api";
import { defaultInputs } from "#constants/constants";
import ActionIcons from "#components/ActionIcons";
import AddForm from "#components/AddForm";
import EditForm from "#components/EditForm";
import Filter from "#components/FoodInventory/Filter";
import Food from "#components/FoodInventory/FoodCategory/Food";
import FoodCategory from "#components/FoodInventory/FoodCategory";
import FoodInventory from "#components/FoodInventory";
import Footer from "#components/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);
  // Store current food list data
  const [data, setData] = useState({});
  //
  const [suggestions, setSuggestions] = useState([]);
  // Current filter value
  const [filter, setFilter] = useState("Tout");
  // Filtered data
  const [filteredData, setFilteredData] = useState([]);
  // Store uniques categories
  const [categories, setCategories] = useState([]);
  // Determine if snackbar is visible
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  // Determine if modal is visible
  const [modalVisible, setModalVisible] = useState(false);
  // Determine what operation was performed and if it was successful or not
  const [operation, setOperation] = useState({ result: "info", desc: "" });
  // Track if a food item is in edit mode
  const [edit, setEdit] = useState({ enabled: false, foodId: "" });
  // Store changes on user inputs
  const [input, setInput] = useState(defaultInputs);

  // Fetch data when loading is true
  useEffect(() => {
    if (loading) {
      fetchData().then((data) => {
        if (typeof data === "string") {
          setOperation({
            desc: data,
            result: "error"
          });
        } else {
          setData(data);
        }
        setLoading(false);
      });

      fetchSuggestions().then((data) => setSuggestions(data));
    }
  }, [loading]);

  // Everytime operation changes and there is a description we set snackbar visibility to true
  useEffect(() => {
    operation?.desc && setSnackbarVisible(true);
  }, [operation]);

  // Disable scrolling when modal visible
  useEffect(() => {
    const body = document.querySelector("body");
    modalVisible
      ? (body.style.overflow = "hidden")
      : (body.style.overflow = "auto");
  }, [modalVisible]);

  // When data are fetched and available, create an array of unique categories from datas.foods array and store it in categories hook.
  useEffect(() => {
    filteredData &&
      setCategories([...new Set(filteredData.map((food) => food.category))]);
  }, [filteredData]);

  // Everytime data (after adding or deleting an item for example) or filter input changes
  useEffect(() => {
    data && filterData();
  }, [data, filter]);

  useEffect(() => {
    // Prevent input to be cleared
    if (!input.expDate) {
      setInput((prevState) => {
        return { ...prevState, expDate: moment().format("YYYY-MM-DD") };
      });
    }
  }, [input]);

  useEffect(() => {
    const foundFood = suggestions.filter(
      (suggestion) => suggestion.name === input.name
    );

    if (!foundFood.length) return;

    setInput((prevState) => {
      return {
        ...prevState,
        category: foundFood[0].category,
        storageLife: foundFood[0].storageLife
      };
    });
  }, [input.name]);

  // Apply filter to data
  const filterData = () => {
    let filteredData;
    if (filter === "Périmé") {
      filteredData = data.foods.filter((food) => food.remainingDays < 1);
    } else if (filter === "Date proche") {
      filteredData = data.foods.filter(
        (food) => food.remainingDays <= 5 && food.remainingDays >= 1
      );
    } else {
      filteredData = data.foods;
    }
    setFilteredData(filteredData);
  };

  // Handle and update user input values changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="main">
      {loading && (
        <div className="loading">
          <CircularProgress sx={{ color: "#fff" }} size={70} />
          <div>Chargement de la liste</div>
        </div>
      )}

      {!loading && (
        <FoodInventory
          filterComponent=<Filter filter={filter} setFilter={setFilter} />
          categories={categories}
        >
          {categories.map((category) => (
            <FoodCategory
              key={category}
              category={category}
              foods={filteredData}
            >
              {filteredData
                .filter((food) => food.category === category)
                .map((food) => (
                  <Food
                    key={food._id}
                    food={food}
                    setEdit={setEdit}
                    setInput={setInput}
                    setOperation={setOperation}
                    setLoading={setLoading}
                  />
                ))}
            </FoodCategory>
          ))}
        </FoodInventory>
      )}

      <Snackbar
        open={snackbarVisible}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarVisible(false);
        }}
      >
        <Alert severity={operation.result} variant="filled">
          {operation.desc}
        </Alert>
      </Snackbar>

      <ActionIcons
        setLoading={setLoading}
        setModalVisible={setModalVisible}
        setOperation={setOperation}
      />

      {modalVisible && (
        <div className="modal">
          <Fab
            color="primary"
            aria-label="add"
            className="close-modal"
            onClick={() => setModalVisible(false)}
          >
            <CloseIcon />
          </Fab>
          <AddForm
            setModalVisible={setModalVisible}
            handleChange={handleChange}
            input={input}
            setInput={setInput}
            setOperation={setOperation}
            setLoading={setLoading}
            suggestions={suggestions}
          />
        </div>
      )}

      {edit.enabled && (
        <div className="modal">
          <Fab
            color="primary"
            aria-label="add"
            className="close-modal"
            onClick={() => setEdit({ enabled: false, foodId: "" })}
          >
            <CloseIcon />
          </Fab>
          <EditForm
            edit={edit}
            handleChange={handleChange}
            input={input}
            setEdit={setEdit}
            setOperation={setOperation}
            setLoading={setLoading}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
