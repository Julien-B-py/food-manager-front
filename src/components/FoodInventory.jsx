import FoodCategory from "./FoodCategory";
import Filter from "./Filter";

const FoodInventory = ({
  categories,
  data,
  filter,
  filterData,
  setEdit,
  setInput,
  setSnackbarVisible,
  setOperation,
  setUpdateNeeded
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
              setSnackbarVisible={setSnackbarVisible}
              setOperation={setOperation}
              setUpdateNeeded={setUpdateNeeded}
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
