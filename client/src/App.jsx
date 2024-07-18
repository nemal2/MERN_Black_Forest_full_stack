import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import AboutPage from "./routes/aboutPage/aboutPage";

import DetectPage from "./routes/detectPage/detectPage";
import ContactPage from "./routes/contactPage/contactPage";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        
      ],
    },

    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path: "/detect",
          element: <DetectPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
