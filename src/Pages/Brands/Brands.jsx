import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader';


export default function Brands() {
  const [brands, setBrands] = useState([])
  async function getBrands() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((response) => {
    

        setBrands(response.data.data)
      })
      .catch((error) => {
       
      })


  }
  useEffect(() => {

    getBrands()
  }, [])
  return (
    <div className='my-10'>
    <div className="my-4">
      <h1 className="font-medium text-3xl ">brands</h1>
    </div>
    <nav className="text-sm text-gray-600">
      <Link to={"home"} className="hover:underline">Home</Link> &gt; <span>Brands</span>
    </nav>
    <div className="row ">
         {brands.length > 0 ? brands.map((brand) => {
                  return (
                    <div key={brand.id} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
                      <div className="p-6 text-center bg-purple-800 h-full flex flex-col justify-between">
                        <div className="w-3/4 mx-auto h-full flex items-center">
                          <img src={brand.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        
                      </div>
                    </div>
                  );
                }) : <Loader />}

   



    </div>


  </div>
  )
}
