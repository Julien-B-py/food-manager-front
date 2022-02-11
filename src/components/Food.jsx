import axios from "axios";

const Food = ({ food, onRefresh }) => {
  const edit = (id) => {
    console.log("edit " + id);
  };

  const remove = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/delete/${id}`)
      .then((response) => console.log(response));

    onRefresh();
  };

  const displayDaysLeft = (param) => {
    if (param > 1) {
      return `Reste ${param} jours`;
    } else if (param > 0) {
      return `Reste ${param} jour`;
    } else if (param === 0) {
      return "Dernier jour";
    } else {
      return "Périmé";
    }
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
            if (window.confirm("Are you sure you wish to delete this item?")) {
              remove(food._id);
            }
          }}
        ></i>
      </div>
    </div>
  );
};

export default Food;
