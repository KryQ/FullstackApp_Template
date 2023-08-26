import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.css'
import Counter from "./pages/Counter.jsx";
import Hello from "./pages/Hello.jsx";

const router = createBrowserRouter( [
  {path: '/', element: <Counter />},
  {path: '/hello', element: <Hello />},
]);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
