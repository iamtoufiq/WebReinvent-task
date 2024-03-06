import "./App.css";
import { Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import { RequiresAuth } from "./RequiresAuth";
import ToasterContext from "./context/ToasterContext";

function App() {
  return (
    <div>
      <ToasterContext />
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <DashBoard />
            </RequiresAuth>
          }
        />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
