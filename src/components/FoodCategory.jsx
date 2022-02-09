import Food from "./Food";

function FoodCategory({ category, foods, onRefresh }) {
  const foodFromCategory = foods.filter((food) => food.category === category);

  return (
    <div>
    <div className="category">
      <h1>{category}</h1> <div className="category-end">
          <h5>{foodFromCategory.length}</h5>
          <i className="fas fa-chevron-circle-up dropdown-icon"></i>
        </div>

    </div>
    <div className="foodList">
    {foodFromCategory.map((food) => (
      <Food key={food._id} food={food} onRefresh={onRefresh} />
    ))}
        </div>
        </div>
  );
}

export default FoodCategory;
