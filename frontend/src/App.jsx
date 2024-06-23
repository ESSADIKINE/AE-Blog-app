import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import YourPostsPage from "./pages/YourPostsPage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoriesPage";
import DashboardUsers from "./components/DashboardUsers";
import DashboardPosts from "./components/DashboardPosts";
import DashboardComments from "./components/DashboardComments";
import DashboardHome from "./components/DashboardHome";
import HeaderLayout from "./layouts/HeaderLayout";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const App = () => {
  const { mode, user } = useSelector((state) => state.user);

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#009975",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: mode === "light" ? "#f4f6f8" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1d1d1d",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
        secondary: mode === "light" ? "#757575" : "#bdbdbd",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/your-posts" element={user ? <YourPostsPage /> : <Navigate to={"/signin"} />} />
            <Route path="/update-post/:postId" element={user ? <UpdatePostPage /> : <Navigate to={"/signin"} />} />
            <Route path="/create-post" element={user ? <CreatePostPage /> : <Navigate to={"/signin"} />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/profile/:username" element={user ? <ProfilePage /> : <Navigate to={"/signin"} />} />
            <Route path="/dashboard" element={user?.isAdmin ? <DashboardPage /> : <Navigate to={"/signin"} />}>
              <Route index element={user?.isAdmin ? <DashboardHome /> : <Navigate to={"/signin"} />} />
              <Route path="users" element={user?.isAdmin ? <DashboardUsers /> : <Navigate to={"/signin"} />} />
              <Route path="posts" element={user?.isAdmin ? <DashboardPosts /> : <Navigate to={"/signin"} />} />
              <Route path="comments" element={user?.isAdmin ? <DashboardComments /> : <Navigate to={"/signin"} />} />
            </Route>
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </ThemeProvider>
      <ToastContainer theme={mode === "light" ? "light" : "dark"} autoClose={3000} position="top-center" pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
