import Filter from "./Filter";
import FoodCategory from "./FoodCategory";

const FoodInventory = ({
  categories,
  data,
  filter,
  filterData,
  setEdit,
  setInput,
  setOperation,
  setLoading
}) => {
  return (
    <div className="inventory">
      <div className="header">
        <h1>Inventaire</h1>
      </div>

      <Filter filter={filter} filterData={filterData} />

      {categories.length > 0 ? (
        <div className="food-list">
          {categories.map((category, index) => (
            <FoodCategory
              key={index}
              category={category}
              foods={data}
              setEdit={setEdit}
              setInput={setInput}
              setOperation={setOperation}
              setLoading={setLoading}
            />
          ))}
        </div>
      ) : (
        <div className="empty-list">Liste vide, merci d'ajouter un élément</div>
      )}
    </div>
  );
};

export default FoodInventory;
