import FoodCategory from "./FoodCategory";
import Filter from "./Filter";

const FoodInventory = ({
  categories,
  data,
  requestRefresh,
  filter,
  filterData,
  setError,
  setSuccessSnackbarVisible,
  setOperation
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
              onRefresh={requestRefresh}
              setError={setError}
              setSuccessSnackbarVisible={setSuccessSnackbarVisible}
              setOperation={setOperation}
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
