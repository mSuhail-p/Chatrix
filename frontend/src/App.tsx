import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import "./App.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Landing />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
