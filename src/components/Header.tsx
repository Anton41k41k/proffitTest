import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCompanyModal from "./AddCompanyModal";
import AddWorkerModal from "./AddWorkerModal";

export default function Header() {
  const { companyName } = useParams();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/", { replace: true });
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h6">
            {!companyName ? "Организации" : companyName}
          </Typography>
          {!!companyName && (
            <Tooltip title="Вернуться к организациям">
              <Button
                onClick={handleGoBack}
                sx={{
                  marginLeft: 3,
                  color: "white",
                  ":hover": { backgroundColor: "transparent" },
                }}
              >
                <ArrowBackIcon />
              </Button>
            </Tooltip>
          )}
        </Box>
        {!companyName ? <AddCompanyModal /> : <AddWorkerModal />}
      </Toolbar>
    </AppBar>
  );
}
