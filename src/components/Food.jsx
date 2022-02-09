import axios from "axios";

function Food({ food, onRefresh }) {
  function edit(id) {
    console.log("edit " + id);
  }

  async function remove(id) {
    console.log("delete " + id);

    const test = { ttt: id };
    console.log(test);

    await axios
      .delete("http://localhost:4000/api/delete/" + id)
      .then((response) => console.log(response));

    onRefresh();
  }

  return (
    <div className="food">
      <p>{food.name}</p>

      <div className="food-center">{food.expDate}</div>
      <div className="food-icons">
      <i className="fas fa-edit action-icon" onClick={() => edit(food._id)}></i>
      <i className="fas fa-trash-alt action-icon" onClick={() => remove(food._id)}></i>
      </div>
    </div>
  );
}

export default Food;
