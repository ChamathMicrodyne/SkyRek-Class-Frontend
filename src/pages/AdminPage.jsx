import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AdminProductsPage from './admin/AdminProductsPage'
import AdminUsersPage from './admin/AdminUsersPage'
import AdminOrdersPage from './admin/AdminOrdersPage'
import AdminReviewPage from './admin/AdminReviewPage'
import AddProductPage from './admin/AddProductPage'

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
                <Route path='/products' element={<AdminProductsPage/>}/>
                <Route path='/users' element={<AdminUsersPage/>}/>
                <Route path='/orders' element={<AdminOrdersPage/>}/>
                <Route path='/reviews' element={<AdminReviewPage/>}/>
                <Route path='/add-product' element={<AddProductPage/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default AdminPage