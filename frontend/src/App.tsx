import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';


const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/*",
    element: <NotFoundPage/>
  }
]);

axios.defaults.baseURL = 'http://127.0.0.1:5000'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
