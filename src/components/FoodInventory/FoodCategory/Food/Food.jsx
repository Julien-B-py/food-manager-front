import { editFood, removeFood } from "#api/api";
import { displayDaysLeft } from "#utils/utils";

import moment from "moment";

const Food = ({
  food,
  setEdit,
  setInput,
  setSnackbarVisible,
  setOperation,
  setLoading
}) => {
  // Manual food edit
  const edit = () => {
    let date;
    if (food.openedDate) {
      date = moment(food.openedDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    } else {
      date = moment().format("YYYY-MM-DD");
    }

    //
    setInput({
      name: food.name,
      category: food.category,
      storageLife: food.storageLife,
      expDate: moment(food.expDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      opened: food.opened,
      openedDate: date,
      quantity:0,
    });

    setEdit({ edit: true, food: food });
  };

  // Quick open food
  const markAsOpen = () => {
    const update = {
      opened: true,
      openOnly: true
    };

    // If operation is successful, clear edit hook and display feedback to user
    editFood(food._id, update).then((response) => {
      if (response === "Success") {
        setOperation({
          desc: `${food.name} modifié avec succès.`,
          result: "success"
        });
        setLoading(true);
      }
    });
  };

  const deleteFood = () => {
    if (
      window.confirm(
        `Are you sure you wish to delete this item: ${food.name}?`
      )
    ) {
      removeFood(food._id).then((response) => {
        if (response === true) {
          setOperation({
            desc: `${food.name} supprimé avec succès.`,
            result: "success"
          });

          setLoading(true);
        } else {
          setOperation({
            desc: response,
            result: "error"
          });
        }
        setSnackbarVisible(true);
      });
    }
  }

  return (
    <div className="food">
      <p> {food.name} </p>
      <div className="food-center">
        <p className="date" style={food.expDays}>
          {displayDaysLeft(food.remainingDays)}
        </p>
      </div>
      <div className="food-icons">
        {!food.opened && (
          <i
            className="fa-solid fa-box-open action-icon"
            onClick={markAsOpen}
          ></i>
        )}
        <i className="fas fa-edit action-icon" onClick={edit}></i>
        <i
          className="fas fa-trash-alt action-icon"
          onClick={deleteFood}
        ></i>
      </div>
    </div>
  );
};

export default Food;
