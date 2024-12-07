import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import PersistLogin from "./auth/PersistLogin.js";
import RequireAuth from "./auth/RequiredAuth.js";
import IndexAdminMcu from "./pages/admin/mcu/index.js";
import Login from "./pages/auth/login.js";
import { RootUser } from "./pages/root/rootCahaya.js";
import Index from "./pages/vendor/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={ <Login/>}/>
      <Route element={<PersistLogin />} >
        <Route element={<RequireAuth allowedRoles={['7']}/>}>
          <Route element={<RootUser />}>
            <Route path="/dashboard" element={ <Index/>}/>
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={['2']}/>}>
          <Route element={<RootUser />}>
            <Route path="/admin" >
              <Route index element={ <IndexAdminMcu/>}/>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App