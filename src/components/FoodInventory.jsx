import FoodCategory from "./FoodCategory";

function FoodInventory({ categories, data, requestRefresh }) {
  return (
    <div className="inventory">
      <div className="header">
        <h1>Inventaire</h1>
      </div>
      {categories.length > 0 ? (
        <div className="food-list">
          {categories.map((category, index) => (
            <FoodCategory
              key={index}
              category={category}
              foods={data}
              onRefresh={requestRefresh}
            />
          ))}
        </div>
      ) : (
        <div className="empty-list">Liste vide, merci d'ajouter un élément</div>
      )}
    </div>
  );
}

export default FoodInventory;
