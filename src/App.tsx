import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import PersistLogin from "./auth/persistLogin";
import RequireAuth from "./auth/RequiredAuth.jsx";
import Index from "./pages/hr";
import { RootUser } from "./pages/root/rootCahaya";

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