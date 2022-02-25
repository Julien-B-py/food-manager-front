import { useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";

import { fetchData } from "#api/api";
import { defaultInputs } from "#constants/constants";
import ActionIcons from "#components/ActionIcons";
import AddForm from "#components/AddForm";
import EditForm from "#components/EditForm";
import FoodInventory from "#components/FoodInventory";
import Footer from "#components/Footer";

const App = () => {
  // Store current food list data
  const [data, setData] = useState({});
  // Determine if snackbar is visible
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  // Determine if modal is visible
  const [modalVisible, setModalVisible] = useState(false);
  // Determine what operation was performed and if it was successful or not
  const [operation, setOperation] = useState({ result: "info", desc: "" });

  const [filteredData, setFilteredData] = useState([]);

  const [filter, setFilter] = useState("Tout");

  const [edit, setEdit] = useState({ enabled: false, foodId: "" });

  // Store changes on user inputs
  const [input, setInput] = useState(defaultInputs);

  const [loading, setLoading] = useState(true);

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
          setOperation={setOperation}
          setLoading={setLoading}
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
          />
        </div>
      )}

      {edit.enabled && (
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