import React, { useEffect, useState } from 'react'
import {sampleProducts} from '../../assets/sampleData.js'
import axios from 'axios'

function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts)

  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
      console.log(res.data)
    })
  },[])

  

  return (
    <div className='w-full h-full max-h-full bg-blue-200 overflow-hidden overflow-y-scroll'>
      <table className='w-full text-center'>
        <thead>
          <tr>
            <th>product Id</th>
            <th>Name</th>
            <th>Images</th>
            <th>Labelled Price</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(
              (item, index) => {
                return(
                  <tr key={index}>
                    <td>{item.productId}</td>
                    <td>{item.name}</td>
                    <td><img src={item.images} className='w-[50px] h-[50px]' /></td>
                    <td>{item.labelledPrice}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                  </tr>
                )
              }
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminProductsPage