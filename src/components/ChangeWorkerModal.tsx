import { Box, IconButton, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch } from "../hooks/redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal as ModalMUI, Tooltip, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { workersSlice } from "../store/reducers/WorkersSlice";
import { Worker } from "../types";
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

export default function ChangeWorkerModal({ ...worker }: Worker) {
  const { changeWorker } = workersSlice.actions;
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
      lastName: worker.lastName,
      firstName: worker.firstName,
      surName: worker.surName,
      role: worker.role,
    },
  });
  const onSubmit: SubmitHandler<Worker> = (data) => {
    data.id = worker.id;
    data.companyId = worker.companyId;
    dispatch(changeWorker(data));
    reset();
    handleCloseModal();
  };
  return (
    <Fragment>
      <Tooltip title="Редактировать сотрудника">
        <Button
          role="button"
          aria-pressed="false"
          onClick={handleOpenModal}
          sx={{ color: "white", ":hover": { backgroundColor: "transparent" } }}
        >
          <EditIcon color="action" />
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
            <Typography variant="h5">Редактировать сотрудника</Typography>
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
