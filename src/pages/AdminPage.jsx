import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ProductsPage from './admin/ProductsPage'
import UsersPage from './admin/UsersPage'
import OrdersPage from './admin/OrdersPage'
import ReviewPage from './admin/ReviewPage'
import AddProductPage from './admin/AddProductPage'
import EditProductPage from './admin/EditProductPage'

function AdminPage() {
  return (
    <div className='w-full h-screen flex'>
        <div className='w-[300px] h-full bg-green-200 flex flex-col'>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/orders">Orders</Link>
            <Link to="/admin/reviews">Reviews</Link>
        </div>
        <div className='w-[calc(100%-300px)] h-full '>
            <Routes path="/*">
                <Route path='/products' element={<ProductsPage/>}/>
                <Route path='/users' element={<UsersPage/>}/>
                <Route path='/orders' element={<OrdersPage/>}/>
                <Route path='/reviews' element={<ReviewPage/>}/>
                <Route path='/add-product' element={<AddProductPage/>}/>
                <Route path='/edit-product' element={<EditProductPage/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default AdminPage