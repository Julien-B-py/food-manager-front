import MenuItem from "@mui/material/MenuItem";
import moment from "moment";

// Array containing all possible categories the user can choose from to add a new food item.
const categories = [
  "Boissons",
  "Conserves",
  "Fruits",
  "Légumes",
  "Plats préparés",
  "Produits laitiers",
  "Sucré",
  "Viandes"
];

// Exports an array containing categories from above to be used in AddForm component.
export const selectCategories = categories.map((categorie) => (
  <MenuItem key={categorie} value={categorie}>
    {categorie}
  </MenuItem>
));

// Array containing all possible filter options
export const filterOptions = ["Tout", "Date proche", "Périmé"];

// Initialize user inputs with empty name, category and set the date input to current date
export const defaultInputs = {
  name: "",
  category: "",
  storageLife: -1,
  expDate: moment().format("YYYY-MM-DD"),
  quantity: 1,
  opened: false,
  openedDate:""
};
