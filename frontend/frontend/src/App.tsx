import Dashboard from "./pages/dashboard";
import { Signin } from "./pages/login";
import { Signup } from "./pages/signup";
import BrainShare from "./components/BrainShare";
import { BrowserRouter,Routes,Route } from "react-router-dom";

 function App(){
  return(
    <BrowserRouter>
    <Routes>
   
      {/* <Dashboard/> */}
      {/* <Signup/> */}
      {/* <Signin/> */}
   <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>} />
     <Route path="/home" element={<Dashboard/>} />
       <Route path="/brain/:shareLink" element={<BrainShare />} />
    </Routes>
    </BrowserRouter>
  )
  
}

export default App