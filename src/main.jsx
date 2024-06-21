import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Body from './components/Body.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Favourites from './components/Favourites.jsx'
import ReadNews from './components/ReadNews.jsx';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Body/>
      },
      {
        path:"/read/:readId",
        element: <ReadNews/>
      },
      {
        path:"/favourites",
        element:<Favourites/>
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
