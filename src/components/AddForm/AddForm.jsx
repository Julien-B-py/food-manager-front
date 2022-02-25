import { useEffect } from "react";

import Button from "@mui/material/Button";
import moment from "moment";

import { addFood } from "#api/api";
import CssTextField from "#components/shared/CssTextField";
import { selectCategories, defaultInputs } from "#constants/constants";

const AddForm = ({
  setModalVisible,
  handleChange,
  input,
  setInput,
  setOperation,
  setLoading
}) => {
  const addFoodAndHideModal = async (e) => {
    e.preventDefault();
    // If name and category are set
    if (input.name && input.category) {
      const foodName = input.name;

      const food = {
        name: input.name,
        category: input.category,
        storageLife: input.storageLife,
        expDate: moment(input.expDate).format("DD/MM/YYYY"),
        opened: false,
        quantity: input.quantity
      };

      const qty = input.quantity;

      addFood(food).then((response) => {
        // If successfully added
        if (response === true) {
          const operationDesc =
            qty > 1
              ? `${qty} ${foodName} ajoutés avec succès`
              : `${foodName} ajouté avec succès`;
          setOperation({
            desc: operationDesc,
            result: "success"
          });
          setModalVisible(false);

          setInput(defaultInputs);

          setLoading(true);
          return;
        }
        // If error
        setOperation({
          desc: response,
          result: "error"
        });
      });
      return;
    }
    // If an input is missing
    setOperation({
      desc: "Merci de renseigner l'aliment et la catégorie",
      result: "error"
    });
  };

  useEffect(() => {
    setInput(defaultInputs);
  }, []);

  return (
    <div className="user-controls">
      <form className="add-input">
        <span>Ajouter un aliment</span>
        <CssTextField
          label="Aliment"
          name="name"
          onChange={(e) => handleChange(e)}
          value={input.name}
        />

        <CssTextField
          label="Catégorie"
          name="category"
          onChange={(e) => handleChange(e)}
          select
          value={input.category}
        >
          {selectCategories}
        </CssTextField>

        <CssTextField
          label="Durée de conservation"
          name="storageLife"
          onChange={(e) => handleChange(e)}
          type="number"
          value={input.storageLife}
        />
        <CssTextField
          label="Date de péremption"
          name="expDate"
          onChange={(e) => handleChange(e)}
          type="date"
          value={input.expDate}
        />
        <CssTextField
          label="Quantité"
          name="quantity"
          onChange={(e) => handleChange(e)}
          type="number"
          value={input.quantity}
          InputProps={{ inputProps: { min: 1 } }}
        />

        <Button
          onClick={(e) => {
            addFoodAndHideModal(e);
          }}
          variant="contained"
        >
          Ajouter
        </Button>
      </form>
    </div>
  );
};

export default AddForm;
