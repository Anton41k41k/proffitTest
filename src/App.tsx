import { CssBaseline } from "@mui/material";
import { MainPage } from "./pages/MainPage";
import { Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/LayoutPage";
import CompanyPage from "./pages/CompanyPage";

function App() {
  return (
    <Fragment>
      <CssBaseline>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path=":companyName" element={<CompanyPage />} />
            <Route path="*" element={<p>Not found</p>} />
          </Route>
        </Routes>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
