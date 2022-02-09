import Food from "./Food";

import { useState } from "react";

function FoodCategory({ category, foods, onRefresh }) {
  // Create a new array containing only food items that match current prop category
  const foodFromCategory = foods.filter((food) => food.category === category);

  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="category">
      <div className="category-header" onClick={toggleVisibility}>
        <h1>{category}</h1>
        <div className="category-end">
          <h5>{foodFromCategory.length}</h5>
          <i
            className={
              "fas fa-chevron-circle-up dropdown-icon " +
              (visibility ? "" : "collapsed")
            }
          ></i>
        </div>
      </div>
      <div className={"foodList " + (visibility ? "" : "hidden")}>
        {foodFromCategory.map((food) => (
          <Food key={food._id} food={food} onRefresh={onRefresh} />
        ))}
      </div>
    </div>
  );
}

export default FoodCategory;