import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import PersistLogin from "./auth/PersistLogin.js";
import RequireAuth from "./auth/RequiredAuth.js";
import Login from "./pages/auth/login.js";
import { RootUser } from "./pages/root/rootCahaya.js";
import Index from "./pages/vendor/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={ <Login/>}/>
      <Route element={<PersistLogin />} >
        <Route element={<RequireAuth />}>
          <Route element={<RootUser />}>
            <Route path="/dashboard" element={ <Index/>}/>
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