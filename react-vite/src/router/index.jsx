import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import Classes from '../components/Classes/Classes';
import DeadLinkPage from '../components/DeadLinkPage/DeadLinkPage';
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
        element: <DeadLinkPage />
      }
    ],
  },
]);