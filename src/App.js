import { useState, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

import { fetchData } from "./api/api";
import { defaultInputs } from "./constants/constants";

import ActionIcons from "./components/ActionIcons";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import FoodInventory from "./components/FoodInventory";
import Footer from "./components/Footer";

function App() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [operation, setOperation] = useState({ result: "info", desc: "" });

  // Store current food list data
  const [data, setData] = useState({});

  const [filteredData, setFilteredData] = useState([]);

  const [filter, setFilter] = useState("Tout");

  const [edit, setEdit] = useState({ edit: false, foodId: "" });

  // Store changes on user inputs
  const [input, setInput] = useState(defaultInputs);

  const [loading, setLoading] = useState(false);

  const [updateNeeded, setUpdateNeeded] = useState(true);
  // Store uniques categories
  const [categories, setCategories] = useState([]);

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
    if (updateNeeded) {
      setLoading(true);

      // Added 300ms delay to fix data not being updated after addind a single food element
      setTimeout(function () {
        fetchData().then((data) => {
          if (typeof data === "string") {
            setOperation({
              desc: data,
              result: "error"
            });
            setSnackbarVisible(true);
          } else {
            setData(data);
            setUpdateNeeded(false);
          }
          setLoading(false);
        });
      }, 300);
    }
  }, [updateNeeded]);

  useEffect(() => {
    operation?.desc && setSnackbarVisible(true);
  }, [operation]);

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
          categories={categories}
          data={filteredData}
          filter={filter}
          filterData={filterData}
          setEdit={setEdit}
          setInput={setInput}
          setSnackbarVisible={setSnackbarVisible}
          setOperation={setOperation}
          setUpdateNeeded={setUpdateNeeded}
        />
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
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setUpdateNeeded={setUpdateNeeded}
        setOperation={setOperation}
        setSnackbarVisible={setSnackbarVisible}
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
            setSnackbarVisible={setSnackbarVisible}
            setUpdateNeeded={setUpdateNeeded}
          />
        </div>
      )}

      {edit.edit && (
        <div className="modal">
          <Fab
            color="primary"
            aria-label="add"
            className="close-modal"
            onClick={() => setEdit(false)}
          >
            <CloseIcon />
          </Fab>
          <EditForm
            edit={edit}
            handleChange={handleChange}
            input={input}
            setInput={setInput}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
