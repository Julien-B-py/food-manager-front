import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";

import { deleteAll } from "#api/api";

const ActionIcons = ({
  modalVisible,
  setModalVisible,
  setLoading,
  setOperation,
  setSnackbarVisible
}) => {
  async function clearList() {
    if (window.confirm("Are you sure you wish to delete all items?")) {
      const success = await deleteAll();

      if (success === true) {
        setLoading(true);
        setOperation({
          desc: "Tous les éléments ont été supprimés avec succès",
          result: "success"
        });
      } else {
        setOperation({ desc: success, result: "error" });
      }

      setSnackbarVisible(true);
    }
  }

  return (
    <div className="action-icons">
      <Fab
        color="primary"
        aria-label="add"
        className="delete-all-button"
        onClick={clearList}
      >
        <DeleteIcon />
      </Fab>

      <Fab
        color="primary"
        aria-label="add"
        className="add-button"
        onClick={() => setModalVisible(!modalVisible)}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default ActionIcons;
