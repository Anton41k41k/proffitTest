import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import { Worker } from "../types";
import ClearIcon from "@mui/icons-material/Clear";
import ChangeWorkerModal from "./ChangeWorkerModal";
import { useAppDispatch } from "../hooks/redux";
import { workersSlice } from "../store/reducers/WorkersSlice";

export default function WorkersItem(worker: Worker) {
  const { id, firstName, lastName, surName, role } = worker;
  const dispatch = useAppDispatch();
  const { deleteWorker } = workersSlice.actions;
  return (
    <ListItem
      sx={{ ":hover": { backgroundColor: "rgba(211, 211, 211, 0.08)" } }}
    >
      <ListItemText primary={`${lastName} ${firstName} ${surName}`} />
      <Box
        sx={{
          minWidth: "40%",
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <ListItemText primary={role} sx={{ textAlign: "left" }} />
        <ChangeWorkerModal {...worker} />
        <IconButton
          onClick={() => dispatch(deleteWorker(id))}
          aria-label="Удалить сотрудника"
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}
