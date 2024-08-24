import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Company as CompanyInterface } from "../types";
import ChangeCompanyModal from "./ChangeCompanyModal";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { companiesSlice } from "../store/reducers/CompaniesSlice";

export function CompanyItem(company: CompanyInterface) {
  const { id, title } = company;
  const { deleteCompany } = companiesSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <ListItem
      sx={{
        padding: "2 0",
        ":hover": { backgroundColor: "rgba(211, 211, 211, 0.08)" },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to={`/${company.title}`}
        state={{ companyId: id, companyName: title }}
        style={{ textDecoration: "none", color: "inherit", flex: 1 }}
      >
        <ListItemText primary={title} />
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <ChangeCompanyModal {...company} />
        <IconButton
          onClick={() => dispatch(deleteCompany(id))}
          aria-label="Удалить компанию"
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}
