import { editFood, removeFood } from "../api/api";
import { displayDaysLeft } from "../utils/utils";

import moment from "moment";

const Food = ({
  food,
  setEdit,
  setInput,
  setSnackbarVisible,
  setOperation,
  setUpdateNeeded
}) => {

  // Manual food edit
  const edit = (foodItem) => {

let date;
if (foodItem.openedDate) {
 date = moment(foodItem.openedDate, "DD/MM/YYYY").format("YYYY-MM-DD")
} else {
   date = moment().format("YYYY-MM-DD")
}

  //
    setInput({
      name: foodItem.name,
      category: foodItem.category,
      storageLife: foodItem.storageLife,
      expDate: moment(foodItem.expDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      opened: foodItem.opened,
      openedDate: date
    });

    setEdit({ edit: true, food: foodItem });
  };

  // Quick open food
  const markAsOpen =  () => {

    const update = {
      opened: true,
      openOnly:true
    };

    // If operation is successful, clear edit hook and display feedback to user
    editFood(food._id, update).then((response) => {
      if (response === "Success") {
        setOperation({
          desc: `${food.name} modifié avec succès.`,
          result: "success"
        });
        setUpdateNeeded(true);
      }
    });


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
      {!food.opened && <i className="fa-solid fa-box-open action-icon" onClick={() => markAsOpen()}></i>}
        <i className="fas fa-edit action-icon" onClick={() => edit(food)}></i>
        <i
          className="fas fa-trash-alt action-icon"
          onClick={() => {
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

                  setUpdateNeeded(true);
                } else {
                  setOperation({
                    desc: response,
                    result: "error"
                  });
                }
                setSnackbarVisible(true);
              });
            }
          }}
        ></i>
      </div>
    </div>
  );
};

export default Food;
