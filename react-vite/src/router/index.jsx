import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import Classes from '../components/Classes/Classes';
// import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginFormPage/>,
      },
      {
        path: "/classes",
        element: <Classes />
      },
      {
        path: "*",
        element: <h1>Looks like your class is in another castle.</h1>
      }
    ],
  },
]);