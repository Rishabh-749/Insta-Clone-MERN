import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/posts/pages/Feed";
import CreatePostModal from "./features/posts/components/CreatePostModal";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Feed/>
    },
    {
        path: "/feed",
        element: <Feed/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/create-post",
        element: <CreatePostModal/>
    }
])
