import { BrowserRouter, Routes } from "react-router-dom"




const Router () => {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router