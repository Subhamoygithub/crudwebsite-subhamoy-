import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Common/Navbar";
import Product from "./Page/Product";
import SignUp from "./Page/Register";
import Login from "./Page/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Createproduct from "./Page/Createproduct";
import Updateproduct from "./Page/Updateproduct";
import User from "./User";
import Home from "./Page/Home";


function App() {
  const queryClient = new QueryClient();
  function PrivateRouter ({children}){
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ):(<Navigate to="/login"/>)
  }
  const PublicRouting =[
    {
      path : "/",
      Component : <Home/>
    },
    {
      path : "/register",
      Component : <SignUp/>
    },
    {
      path : "/login",
      Component : <Login/>
    },

  ]
  const PrivateRouting =[
    {
      path : "/product",
      Component : <Product/>
    },
    {
      path : "/createproduct",
      Component : <Createproduct/>
    },
    {
      path : "/update/:id",
      Component : <Updateproduct/>
    },

  ]
  return (
    <>
    {/* <User/> */}
      <QueryClientProvider client={queryClient}>
      <ToastContainer />
        <Router>
          <Navbar />
          
          <Routes>
          {
            PublicRouting.map((pub,pubi)=>{
              return(
                <>
                <Route
                path={pub?.path}
                element={pub?.Component}
                />
                </>
              )
            })
          }
             {
            PrivateRouting.map((pri,pi)=>{
              return(
                <>
                <Route
                path={pri?.path}
                element={<PrivateRouter>{pri?.Component}</PrivateRouter>}
                />
                </>
              )
            })
          }
            
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
