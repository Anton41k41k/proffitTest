import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { companiesSlice } from "../store/reducers/CompaniesSlice";
import { useAppDispatch } from "../hooks/redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Company } from "../types";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Button, Modal as ModalMUI, Tooltip, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
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

export default function AddCompanyModal() {
  const { addCompany } = companiesSlice.actions;
  const companies = useSelector((state: RootState) => state.companies);
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
      title: "",
    },
  });
  const onSubmit: SubmitHandler<Company> = (data) => {
    let id = companies.reduce((max, item) => {
      return item.id > max ? item.id : max;
    }, 0);
    data.id = ++id;
    dispatch(addCompany(data));
    reset();
    handleCloseModal();
  };
  return (
    <Fragment>
      <Tooltip title="Добавить организацию">
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
            <Typography variant="h5">Добавить организацию</Typography>
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
