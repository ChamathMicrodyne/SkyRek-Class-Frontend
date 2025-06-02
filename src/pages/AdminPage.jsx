import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ProductsPage from './admin/ProductsPage'
import UsersPage from './admin/UsersPage'
import OrdersPage from './admin/OrdersPage'
import ReviewPage from './admin/ReviewPage'
import AddProductPage from './admin/AddProductPage'
import EditProductPage from './admin/EditProductPage'
import AdminSidebar from '../components/AdminSideBar'

function AdminPage() {
  return (
    <div className='w-full h-screen flex'>
        <AdminSidebar />
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