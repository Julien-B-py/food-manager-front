import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";

const ActionIcons = ({ deleteAll, setModalVisible, modalVisible }) => {
  return (
    <div className="action-icons">
      <Fab
        color="primary"
        aria-label="add"
        className="delete-all-button"
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete all items?")) {
            deleteAll();
          }
        }}
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
