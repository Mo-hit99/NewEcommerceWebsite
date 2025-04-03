import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import productImage from '../assets/products/alex-haigh-fEt6Wd4t4j0-unsplash.jpg'
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//     productImage,
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee 2",
//     href: "#",
//     imageSrc:
//     productImage,
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: "$35",
//     color: "White",
//   },
//   {
//     id: 3,
//     name: "Basic Tee 3",
//     href: "#",
//     imageSrc:
//     productImage,
//     imageAlt: "Front of men's Basic Tee in gray.",
//     price: "$35",
//     color: "Gray",
//   },
//   {
//     id: 4,
//     name: "Basic Tee 4",
//     href: "#",
//     imageSrc:
//     productImage,
//     imageAlt: "Front of men's Basic Tee in blue.",
//     price: "$35",
//     color: "Blue",
//   },
//   {
//     id: 5,
//     name: "Basic Tee 5",
//     href: "#",
//     imageSrc:
//     productImage,
//     imageAlt: "Front of men's Basic Tee in green.",
//     price: "$35",
//     color: "Green",
//   },
//   {
//     id: 6,
//     name: "Basic Tee 6",
//     href: "#",
//     imageSrc:
//     productImage,
//     imageAlt: "Front of men's Basic Tee in red.",
//     price: "$35",
//     color: "Red",
//   },
// ];
export default function AllCollectionsItems() {
  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [products,setProducts] =useState([])
  useEffect(()=>{
   fetchProductData()
  },[])
  async function fetchProductData(){
    try {
      const response = await axios.get('/api/v1/products/productData');
      if(response){
        setProducts(response.data.queryData)
      }
      
    } catch (error) {
      console.log(error)
    }
  
  }
  return (
    <div className="h-full p-4">
      <div className="mx-auto">
        <div className="p-4">
          <h1 className="text-lg p-2 font-medium leading-tight sm:text-xl sm:font-semibold md:text-2xl lg:text-3xl xl:text-3xl text-center">
            Collections
          </h1>
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product._id}>
                <div className="mx-auto">
                  <div className="px-2 py-2">
                    <div className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-4">
                      <div className="group relative w-[calc(250px-20px)] p-2 mx-auto">
                        <img
                          alt={product.imageAlt}
                          src={`${product.imageUrl[0]}`}
                          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 group-hover:scale-90 transition-all lg:aspect-auto lg:h-80 z-10"
                        />
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <NavLink to={`/productdetailspage/${product._id}`}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {product.productName}
                              </NavLink>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                          ₹{product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
