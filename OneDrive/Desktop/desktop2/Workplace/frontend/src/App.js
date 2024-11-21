import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import * as React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Sidebar from "../src/components/Sidebar";
import Adminlayout from "./layout/Authlayout";
import Guestlayout from "./layout/Guestlayout";
import Attendance from "./users/Attendance"
import Team from "./users/Team";
import Task from "./users/Task";
import Myleave from "./users/Myleave";
import Holiday from "./users/Holiday";
import Createleave from "./users/Createleave";
import Viewtask from "./users/Viewtask";
import Roles from "./users/Roles";
import Allclient from "./admin/Allclient";
import Allproject from "./users/Allproject";
import Allemployee from "./admin/Allemployee";
import Exportdata from "./admin/Dataexports";

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Routes>
          <Route element={<Adminlayout />}>
         
            <Route path="/"></Route>
            <Route path="/attendance" element={<Attendance />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route path="/my-leave" element={<Myleave />}></Route>
            <Route path="/task" element={<Task />}></Route>
            <Route path="/holiday" element={<Holiday />}></Route>
            <Route path="/createleave" element={<Createleave />}></Route>
            <Route path="/taskinfo/:id" element={<Viewtask />}></Route>
            <Route path="/role" element={<Roles />}></Route>
            <Route path="/client" element={<Allclient />}></Route>
            <Route path="/project" element={<Allproject />}></Route>
            <Route path="/employee" element={<Allemployee />}></Route>
            <Route path="/export-data" element={<Exportdata />}></Route>
          </Route>
          <Route element={<Guestlayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
