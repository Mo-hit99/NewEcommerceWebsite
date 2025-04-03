import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductsList() {
  const [search,setSearch] = useState('');
  const [productData, setProductData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchProductData();
  }, [page, search]);
  async function fetchProductData() {
    try {
      const response = await axios.get("/api/v1/products/productData",{
        params:{
          page,
          limit : 12,
          search
        }
      });
      if (response) {
        setProductData(response.data.queryData);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProduct(id) {
    try {
      const response = await axios.delete(`/api/v1/products/productData/${id}`);
      if (response) {
        fetchProductData();
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("delete failed");
    }
  }
 
  return (
    <div className="bg-white -z-10">
      <ToastContainer />
      <input
        className={`mt-6 appearance-none border-2 pl-5 border-gray-300 hover:border-gray-400  rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:shadow-outline max-w-[600px]`}
        id="username"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />
      <div className="absolute left-0 inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="px-2 py-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productData.map((product) => (
            <div key={product._id} className="group relative">
              <button onClick={() => deleteProduct(product._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 absolute top-5 right-0 z-20  text-red-500 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <img
                alt={product._id}
                src={`${
                  product.imageUrl[0]
                }`}
                className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80 z-10 group-hover:scale-95 transition-all"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <NavLink to={`/productdetailspage/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.productName}
                    </NavLink>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mx-auto mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className=" text-white rounded disabled:cursor-not-allowed"
          >
            <svg
              width={26}
              height={26}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-500"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-gray-700 font-medium mr-2 ml-2">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className=" text-white rounded  disabled:cursor-not-allowed"
          >
            <svg
              width={26}
              height={26}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-400"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
