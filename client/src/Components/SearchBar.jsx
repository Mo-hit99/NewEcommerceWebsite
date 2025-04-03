import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar({ CloseModel }) {
const [query,setQuery] = useState('');
 const navigate  = useNavigate();
 function handleSearch(e){
  e.preventDefault()
  if(query.trim()){
    setTimeout(()=>{
      navigate(`/products/?search=${encodeURIComponent(query)}`)
    },400)
  }
 
 }
  return (
    <form
      className={`fixed top-[15%] left-[20%] z-20 w-2/3 transition-transform duration-400 ease-in-out ${
        CloseModel ? "transform translate-y-0" : "transform -translate-y-100"
      }`}
      onSubmit={handleSearch}
    >
      <input
        className={`appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400  rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:shadow-outline`}
        id="username"
        type="text"
        placeholder="Search..."
        onChange={(e)=> setQuery(e.target.value)}
      />
      <div className="absolute right-0 inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={CloseModel}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
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
    </form>
  );
}
