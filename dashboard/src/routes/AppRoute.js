import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Home from "../pages/home/Home";
import Modal from "../components/modal/Modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import UserList from "../pages/userList/UserList";
//import User from "../pages/user/User";
//import NewUser from "../pages/newUser/NewUser";
//import ProductList from "../pages/productList/ProductList";
//import Product from "../pages/product/Product";
import Info from "../components/info/Info";
//import NewProduct from "../pages/newProduct/NewProduct";
import Login from "../pages/login/Login";
import CreateProject from "../pages/createproject/CreateProject";
import PrivateRoute from "./PrivateRoute";

export default function AppRoute() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          {/*   <PrivateRoute exact path="/" component={Home} /> */}
          <Route path="/" element={<PrivateRoute Component={Home} />} />
          <Route path="/login" element={<Login />} />
          {/*   <Route path="/users" element={<UserList />} /> */}
          <Route path="/edit" element={<PrivateRoute Component={Modal} />} />
          <Route path="/info" element={<PrivateRoute Component={Info} />} />
          {/*  <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} /> */}
          <Route
            path="/createproject"
            element={<PrivateRoute Component={CreateProject} />}
          />
          {/* <Route path="/product/:productId" element={<ProductList />} />
          <Route path="/newproduct" element={<NewProduct />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
