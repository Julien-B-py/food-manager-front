import { removeFood } from "../api/api";
import { displayDaysLeft } from "../utils/utils";

const Food = ({
  food,

  setSnackbarVisible,
  setOperation,
  setUpdateNeeded
}) => {
  const edit = (id) => {
    console.log("edit " + id);
  };

  return (
    <div className="food">
      <p> {food.name} </p>
      <div className="food-center">
        <p className="date" style={food.expDays}>
          {displayDaysLeft(food.remainingDays)}
        </p>
      </div>
      <div className="food-icons">
        <i
          className="fas fa-edit action-icon"
          onClick={() => edit(food._id)}
        ></i>
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
