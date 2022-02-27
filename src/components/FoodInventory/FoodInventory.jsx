const FoodInventory = ({ categories, children, filterComponent }) => {
  return (
    <div className="inventory">
      <div className="header">
        <h1>Inventaire</h1>
      </div>
      {filterComponent}

      {categories.length > 0 ? (
        <div className="food-list">{children}</div>
      ) : (
        <div className="empty-list">Liste vide, merci d'ajouter un élément</div>
      )}
    </div>
  );
};

export default FoodInventory;
