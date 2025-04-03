import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useSearchParams } from "react-router";
import calculateDiscountPercentage from "../FunctionHelper/discountPricePercentage";

export default function ProductsList({ filters, sort }) {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("search") || "";
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(queryFromUrl);
  const categoryFromUrl = searchParams.get("category") || "";
  const [totalPages, setTotalPages] = useState(0);

  // Update the search state whenever the URL changes
  useEffect(() => {
    setSearch(queryFromUrl);
    setPage(1); // Reset page if needed
  }, [queryFromUrl]);

  useEffect(() => {
    fetchProductData();
  }, [page, search, filters, sort, categoryFromUrl]);

  async function fetchProductData() {
    try {
      const params = {
        page,
        limit: 12,
        search,
      };

      if (categoryFromUrl) {
        params.category = categoryFromUrl;
      }
      if (sort) {
        params.sort = sort;
      }
      if (filters) {
        Object.keys(filters).forEach((key) => {
          if (filters[key].length > 0) {
            params[key] = filters[key].join(",");
          }
        });
      }
      const response = await axios.get("/api/v1/products/productData", {
        // params: {
        //   page,
        //   limit: 12,
        //   search,
        //   // sort: sortField,
        //   // order: sortOrder,
        //   // category
        // },
        params,
      });
      if (response) {
        setProductData(response.data.queryData);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white -z-10">
      <div className="px-2 py-2">
        {productData.length === 0 ? (
          <div className="h-screen w-full text-center space-y-8 p-8 bg-white rounded shadow">
            <div className="flex justify-center items-center  animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={100}
                height={100}
                viewBox="0 0 256 256"
                xmlSpace="preserve"
              >
                <defs />
                <g
                  style={{
                    stroke: "none",
                    strokeWidth: 0,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <polygon
                    points="28.55,28.74 45,35.39 45,89 2.44,71.81 2.44,38.43 2.44,18.19 18.89,24.84 18.89,24.84 18.89,47.27 28.55,51.18 "
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(226,174,131)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="  matrix(1 0 0 1 0 0) "
                  />
                  <polygon
                    points="87.56,18.19 45,35.39 28.55,28.74 71.11,11.55 "
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(226,174,131)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="  matrix(1 0 0 1 0 0) "
                  />
                  <polygon
                    points="61.45,7.64 18.89,24.84 18.89,24.84 2.44,18.19 45,1 "
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(226,174,131)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="  matrix(1 0 0 1 0 0) "
                  />
                  <polyline
                    points="45,35.39 45,89 87.56,71.81 87.56,38.43 87.56,18.19 45,35.39 "
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(196,141,105)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="  matrix(1 0 0 1 0 0) "
                  />
                  <polygon
                    points="61.45,7.64 18.89,24.84 18.89,47.27 28.55,51.18 28.55,28.74 71.11,11.55 "
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(255,210,166)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="  matrix(1 0 0 1 0 0) "
                  />
                  <path
                    d="M 45 36.387 c -0.127 0 -0.254 -0.024 -0.375 -0.073 l -16.45 -6.646 c -0.512 -0.207 -0.76 -0.79 -0.553 -1.302 c 0.207 -0.512 0.791 -0.758 1.302 -0.553 L 45 34.309 l 39.89 -16.115 L 45 2.079 L 5.11 18.193 l 14.154 5.718 c 0.512 0.207 0.76 0.79 0.553 1.302 c -0.207 0.512 -0.791 0.759 -1.302 0.553 L 2.066 19.121 c -0.378 -0.153 -0.625 -0.52 -0.625 -0.927 s 0.248 -0.774 0.625 -0.927 l 42.56 -17.193 c 0.24 -0.097 0.509 -0.097 0.749 0 l 42.56 17.193 c 0.378 0.153 0.625 0.52 0.625 0.927 s -0.247 0.774 -0.625 0.927 l -42.56 17.194 C 45.254 36.363 45.127 36.387 45 36.387 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 45 90 c -0.196 0 -0.392 -0.058 -0.559 -0.171 C 44.165 89.644 44 89.332 44 89 V 35.387 c 0 -0.408 0.248 -0.774 0.625 -0.927 l 42.559 -17.194 c 0.309 -0.124 0.657 -0.088 0.935 0.098 c 0.275 0.186 0.44 0.497 0.44 0.829 v 53.613 c 0 0.407 -0.247 0.774 -0.625 0.927 l -42.56 17.193 C 45.254 89.976 45.126 90 45 90 z M 46 36.062 v 51.456 l 40.56 -16.386 V 19.676 L 46 36.062 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 45 90 c -0.126 0 -0.254 -0.024 -0.375 -0.073 L 2.066 72.733 c -0.378 -0.152 -0.625 -0.52 -0.625 -0.927 V 18.193 c 0 -0.333 0.165 -0.643 0.441 -0.829 c 0.275 -0.186 0.625 -0.223 0.934 -0.098 l 16.449 6.646 c 0.512 0.207 0.76 0.79 0.553 1.302 c -0.207 0.513 -0.789 0.759 -1.302 0.553 L 3.44 19.676 v 51.456 L 44 87.518 V 36.062 l -15.824 -6.393 c -0.512 -0.207 -0.76 -0.79 -0.553 -1.302 c 0.207 -0.511 0.791 -0.758 1.302 -0.553 l 16.45 6.646 C 45.752 34.613 46 34.979 46 35.387 V 89 c 0 0.332 -0.165 0.644 -0.441 0.829 C 45.392 89.942 45.196 90 45 90 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 28.55 52.177 c -0.126 0 -0.254 -0.024 -0.375 -0.073 L 18.515 48.2 c -0.378 -0.152 -0.625 -0.52 -0.625 -0.927 V 24.839 c 0 -0.408 0.248 -0.774 0.625 -0.927 L 61.074 6.718 c 0.24 -0.097 0.51 -0.097 0.75 0 l 9.661 3.903 c 0.378 0.153 0.625 0.52 0.625 0.927 s -0.247 0.774 -0.625 0.927 L 29.55 29.416 v 21.761 c 0 0.332 -0.165 0.644 -0.441 0.829 C 28.942 52.119 28.747 52.177 28.55 52.177 z M 19.89 46.599 l 7.661 3.096 V 28.742 c 0 -0.408 0.248 -0.774 0.625 -0.927 L 68.44 11.548 l -6.991 -2.824 L 19.89 25.513 V 46.599 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 52.542 78.351 c -0.396 0 -0.77 -0.236 -0.927 -0.625 c -0.207 -0.513 0.04 -1.096 0.552 -1.302 l 9.661 -3.902 c 0.513 -0.207 1.095 0.04 1.302 0.552 c 0.207 0.513 -0.04 1.096 -0.552 1.302 l -9.661 3.902 C 52.794 78.327 52.667 78.351 52.542 78.351 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 52.542 72.119 c -0.396 0 -0.77 -0.236 -0.927 -0.625 c -0.207 -0.513 0.04 -1.096 0.552 -1.302 l 9.661 -3.903 c 0.513 -0.207 1.095 0.04 1.302 0.552 c 0.207 0.513 -0.04 1.096 -0.552 1.302 l -9.661 3.903 C 52.794 72.096 52.667 72.119 52.542 72.119 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 52.542 65.887 c -0.396 0 -0.77 -0.236 -0.927 -0.625 c -0.207 -0.513 0.04 -1.096 0.552 -1.302 l 9.661 -3.902 c 0.513 -0.207 1.095 0.04 1.302 0.552 c 0.207 0.513 -0.04 1.096 -0.552 1.302 l -9.661 3.902 C 52.794 65.863 52.667 65.887 52.542 65.887 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Oops! Product Not Found
            </h1>

            <p className="text-gray-600 text-lg max-w-md mx-auto">
              We couldn't find the product you're looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productData.map((product) => (
                <div key={product._id} className="group relative">
                  {product.discount ? (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-blue-500 text-white  px-2 py-1 rounded">
                        <span className="text-sm">
                          {calculateDiscountPercentage(
                            product.price,
                            product.discount
                          )}
                          % OFF
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <img
                    alt={product._id}
                    src={`${
                      product.imageUrl[0]
                    }`}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 group-hover:scale-95 transition-all"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <NavLink
                          to={`/productdetailspage/${product._id}`}
                          className="z-40 cursor-pointer"
                        >
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
                    <div className="flex items-baseline space-x-3">
                      <span className="text-sm md:text-sm text-gray-400 line-through">
                        ₹{product.price}
                      </span>
                      <span className="text-md md:text-md font-bold text-blue-600">
                        ₹{product.discount}
                      </span>
                    </div>
                    {/* <p className="text-sm font-medium text-gray-900">
                      ₹{product.price}
                    </p> */}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 mx-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <NavLink
                      to={`/productdetailspage/${product._id}`}
                      className="view-button group relative inline-flex items-center justify-center pt-2 overflow-hidden rounded transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <span className="relative flex items-center text-blue-700 font-body tracking-wider">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 80 80"
                          xmlSpace="preserve"
                          height={26}
                          width={26}
                        >
                          <path
                            fill="#18CEF6"
                            d="M20.326 49.161c0 .51.057 1.007.16 1.49 1.347.031 2.568.034 2.85-.052.694-.213-.116-4.471 5.44-5.854 5.556-1.384 6.482 6.492 6.482 6.492l15.858-.319s.463-.319 1.736-3.3c1.273-2.98 2.547-2.554 7.176-1.916 4.629.639 3.241 5.109 4.283 5.215 1.042.107 1.968-1.171 2.662-5.322.694-4.15.463-13.623-1.157-19.69-1.229-4.603-4.458-5.898-7.461-7.557H23.798c-3.559 0-3.472 2.235-3.472 4.47v26.343zM19.023 62.889c-.816-.001-1.474-.605-1.475-1.357.001-.75.659-1.357 1.475-1.357h45.491c.815 0 1.474.607 1.475 1.357-.001.751-.661 1.355-1.475 1.357H19.023z"
                          />
                          <path
                            fill="#233251"
                            d="M68.189 33.569c.008-7.449-3.866-12.402-7.688-15.383-3.825-2.995-7.599-4.113-7.676-4.139L52.666 14H21.154c-3.397 0-6.152 2.532-6.154 5.658v26.888c.001 3.124 2.756 5.657 6.154 5.658h1.878c.834 2.666 3.5 4.619 6.67 4.62 3.168-.001 5.835-1.954 6.669-4.62h14.44c.835 2.667 3.502 4.619 6.67 4.619 3.32 0 6.09-2.142 6.778-5.003 2.299-.82 3.928-2.871 3.93-5.274h-.002l.002-12.977zM52.748 16.063c1.318.481 4.702 1.915 7.705 4.69 2.69 2.493 5.08 6.015 5.559 11.006H49.033V15.916h3.296c.094.031.234.079.419.147zM29.702 54.907c-2.686-.005-4.856-2.002-4.862-4.47.006-2.469 2.176-4.466 4.862-4.47 2.684.004 4.857 2.001 4.861 4.47-.004 2.469-2.177 4.465-4.861 4.47zm0-10.856c-3.781.001-6.847 2.779-6.937 6.236h-1.611c-2.247-.004-4.065-1.675-4.069-3.742V19.658c.004-2.067 1.822-3.738 4.069-3.742h25.795v34.371h-10.31c-.089-3.457-3.157-6.235-6.937-6.236zm27.779 10.856c-2.685-.004-4.856-2.001-4.861-4.47.005-2.469 2.176-4.465 4.861-4.47 2.685.005 4.856 2.001 4.861 4.47-.004 2.469-2.176 4.466-4.861 4.47zm8.623-8.362c-.003 1.268-.695 2.377-1.744 3.052-.449-3.129-3.353-5.545-6.879-5.546-3.781.001-6.848 2.779-6.937 6.236h-1.511V33.675h17.072l.001 12.87h-.002z"
                          />
                        </svg>
                        <span className="text-sm ml-1">View Product</span>
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/10 blur-lg"></div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center mx-auto">
              <button
                disabled={page === 1}
                onClick={() =>
                  setTimeout(() => {
                    setPage(page - 1);
                  }, 400)
                }
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
                onClick={() =>
                  setTimeout(() => {
                    setPage(page + 1);
                  }, 400)
                }
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
          </>
        )}
      </div>
    </div>
  );
}
