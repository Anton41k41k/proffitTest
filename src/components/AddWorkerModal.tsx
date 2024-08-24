import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch } from "../hooks/redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Worker } from "../types";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Button, Modal as ModalMUI, Tooltip, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { workersSlice } from "../store/reducers/WorkersSlice";
import { useLocation } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

export default function AddWorkerModal() {
  const location = useLocation();
  const companyId = location.state.companyId;
  const { addWorker } = workersSlice.actions;
  const workers = useSelector((state: RootState) => state.workers);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  function handleOpenModal() {
    setOpen(true);
  }
  function handleCloseModal() {
    setOpen(false);
  }
  const { handleSubmit, control, reset } = useForm<Worker>({
    defaultValues: {
      lastName: "",
      firstName: "",
      surName: "",
      role: "",
    },
  });
  const onSubmit: SubmitHandler<Worker> = (data) => {
    let id = workers.reduce((max, item) => {
      return item.id > max ? item.id : max;
    }, 0);
    data.id = ++id;
    data.companyId = companyId;
    dispatch(addWorker(data));
    reset();
    handleCloseModal();
  };

  return (
    <Fragment>
      <Tooltip title="Добавить сотрудника">
        <Button
          role="button"
          aria-pressed="false"
          onClick={handleOpenModal}
          sx={{ color: "white", ":hover": { backgroundColor: "transparent" } }}
        >
          <AddIcon />
        </Button>
      </Tooltip>
      <ModalMUI open={open} onClose={handleCloseModal}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Добавить сотрудника</Typography>
            <IconButton onClick={handleCloseModal}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="Фамилия"
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="Имя"
                />
              )}
            />
            <Controller
              name="surName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="Отчество"
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="Должность"
                />
              )}
            />
            <IconButton
              sx={{ width: "fit-content", alignSelf: "flex-end" }}
              type="submit"
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </ModalMUI>
    </Fragment>
  );
}
