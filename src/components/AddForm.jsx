function AddForm({ input, handleChange, addFood, deleteAll }) {
  return (
    <div className="user-controls">
      <form className="add-input">
        <input
          name="name"
          placeholder="Aliment"
          value={input.name}
          onChange={(e) => handleChange(e)}
        ></input>
        <select
          name="category"
          onChange={(e) => handleChange(e)}
          value={input.category}
        >
          <option value="">Choisir catégorie</option>
          <option>Boissons</option>
          <option>Conserves</option>
          <option>Fruits</option>
          <option>Légumes</option>
          <option>Plats préparés</option>
          <option>Sucré</option>
          <option>Viandes</option>
          <option>Yaourts</option>
        </select>
        <input
          type="number"
          name="storageLife"
          value={input.storageLife}
          id="storageLife"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          type="date"
          name="expDate"
          onChange={(e) => handleChange(e)}
          value={input.expDate}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addFood();
          }}
        >
          Ajouter
        </button>
      </form>
      <div>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete all items?")) {
              deleteAll();
            }
          }}
        >
          Delete all
        </button>
      </div>
    </div>
  );
}

export default AddForm;
