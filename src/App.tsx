import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import AddProduct from "./components/AddProduct"


function App() {
  return (
  <>
  
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/details" element={<Details/>} />
      <Route path="/add-product" element={<AddProduct/>} />
    </Routes>

  </>
  
  )
}

export default App 