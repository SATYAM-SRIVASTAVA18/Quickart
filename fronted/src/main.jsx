import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import "./index.css";

import Home from './component/Home.jsx'

import Admin from './page/Admin.jsx'
import Login from './component/Login.jsx'
import Produnavbar from './component/Produnavbar.jsx'
import ProductDetails from './component/ProductDetails.jsx'
import Register from './component/Register.jsx'
import Cart from './component/Cart.jsx'
import About from './component/About.jsx'
import Review from './component/Review.jsx'
import ReviewList from './component/ReviewList.jsx'
import Adminehome from './page/Adminehome.jsx'
import Delete from './page/Delete.jsx'
import OrderCon from './component/Ordercom.jsx'
import ContactUs from './component/ContactUs.jsx'
import Edit from './page/Edit.jsx'
import SearchResult from './component/SearchResult.jsx'
import AddAddress from './component/AddAddress.jsx'
import AddressList from './component/AddressList.jsx'
import MyOrders from './component/MyOrders.jsx'
import AdminOrders from './page/AdminOrders.jsx'
import Payment from './Payment.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>

  <Routes>
    
<Route path='/' element={<Home/>}></Route>
<Route path='/search' element={<SearchResult/>}></Route>
<Route path='/products/:id' element={<ProductDetails/>}></Route>
<Route path='/register' element={<Register/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/review' element={<Review/>}></Route>
<Route path='/cart' element={<Cart/>}></Route>
<Route path='/relist' element={<ReviewList/>}></Route>
<Route path='/pronavbar' element={<Produnavbar/>}></Route>
<Route path='/about' element={<About/>}></Route>
<Route path='/admin' element={<Admin/>}></Route>
<Route path='/adminehome' element={<Adminehome/>}></Route>
<Route path='/delete' element={<Delete/>}></Route>
<Route path='/order' element={<OrderCon/>}></Route>
<Route path ='/contact' element={<ContactUs/>}></Route>
<Route path='/edit/:id' element={<Edit/>}></Route>
<Route path='/addaddress' element={<AddAddress/>} />
<Route path='/addresslist' element={<AddressList/>} />
<Route path='/myorder' element={<MyOrders/>} />
<Route path='/admin/orders' element={<AdminOrders/>} />
<Route path='/payment' element={<Payment/>} />

  </Routes>
  
  
  </BrowserRouter>
  </StrictMode>,
)
