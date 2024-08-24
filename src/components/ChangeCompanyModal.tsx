import { Box, IconButton, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { companiesSlice } from "../store/reducers/CompaniesSlice";
import { useAppDispatch } from "../hooks/redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Company } from "../types";
import { Button, Modal as ModalMUI, Tooltip, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
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

export default function ChangeCompanyModal({ ...company }: Company) {
  const { changeCompany } = companiesSlice.actions;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  function handleOpenModal() {
    setOpen(true);
  }
  function handleCloseModal() {
    setOpen(false);
  }
  const { handleSubmit, control, reset } = useForm<Company>({
    defaultValues: {
      title: company.title,
    },
  });
  const onSubmit: SubmitHandler<Company> = (data) => {
    data.id = company.id;
    dispatch(changeCompany(data));
    reset();
    handleCloseModal();
  };
  return (
    <Fragment>
      <Tooltip title="Редактировать организацию">
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
            <Typography variant="h5">Редактировать организацию</Typography>
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
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="Название организации"
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
