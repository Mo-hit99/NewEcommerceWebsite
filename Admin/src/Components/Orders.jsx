import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function Orders() {
  const [allInvoiceData, setAllInvoiceData] = useState([]);
  const [search,setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  useEffect(() => {
    fetchAllInvoiceData();
  }, [page,search]);

  async function fetchAllInvoiceData() {
    try {
      const response = await axios.get("/api/v1/invoices/payment/invoice",{
        params:{
          page,
          limit : 12,
          search
        }
      });
      console.log(response.data);
      setAllInvoiceData(response.data.safeGetInvoice);
      setTotalPages(response.data.totalPages);
      response.data.forEach((invoice) => fetchRemainingdays(invoice));
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchRemainingdays(invoice) {
    try {
      const response = await axios.get(
        `/api/v1/invoices/payment/invoice/${invoice._id}/remainingdays`
      );

      setDeliveryInfo((prev) => ({
        ...prev,
        [invoice._id]: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  // Format dates for display
  const dateOption = { month: "short", day: "numeric", year: "numeric" };
  async function handleStatusChange(invoiceId, newStatus) {
    try {
      await axios.put(
        `/api/v1/invoices/payment/order/${invoiceId}/updateStatus`,
        { status: newStatus }
      );
      // Refresh the invoice list after update
      fetchAllInvoiceData();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
       <input
        className={`mt-6 appearance-none border-2 pl-5 border-gray-300 hover:border-gray-400  rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:shadow-outline max-w-[600px]`}
        id="username"
        type="text"
        placeholder=" Search by OrderId, CustomerName, CustomerEmail, CustomerAddress"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />

<div className="flex justify-end items-center  my-4">
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
      {allInvoiceData && allInvoiceData.length > 0 ? (
        allInvoiceData.map((invoiceData) => {
          const info = deliveryInfo[invoiceData._id];
          const formattedOrderDate = info
            ? new Date(info.orderDate).toLocaleDateString("en-US", dateOption)
            : "";
          const formattedExpectedDate = info
            ? new Date(info.expectedDeliveryDate).toLocaleDateString(
                "en-US",
                dateOption
              )
            : "";
          return (
            <div
              key={invoiceData._id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{invoiceData.orderId}</h3>
                <select
                  onChange={(e) =>
                    handleStatusChange(invoiceData._id, e.target.value)
                  }
                  className="px-3 py-1 rounded-full text-sm border"
                >
                  <option value="Order Placed" className=" text-black">
                    Order Placed
                  </option>
                  <option value="Processed" className="text-black">
                    Processed
                  </option>
                  <option value="Shipped" className=" text-black">
                    Shipped
                  </option>
                  <option value="Out for Delivery" className=" text-black">
                    Out for Delivery
                  </option>
                  <option value="Delivered" className=" text-black">
                    Delivered
                  </option>
                </select>
              </div>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Customer Details</h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium mr-2">Name:</span>
                    {invoiceData.CustomerName.toUpperCase()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium mr-2">Email:</span>
                    {invoiceData.CustomerEmail}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium mr-2">Address:</span>
                    {invoiceData.CustomerAddress}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium mr-2">Order Date:</span>
                    {formattedOrderDate}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium mr-2">
                      Expected Delivery Date:
                    </span>
                    {formattedExpectedDate}
                  </p>
                </div>
              </div>
              <div className="space-y-4 mb-4">
                {invoiceData.cartItems.map((product, index) => (
                  <React.Fragment key={index}>
                    <div className="flex space-x-4 pb-4 border-b">
                      <div className="flex space-x-2">
                        <img
                          src={`${product.productImg}`}
                          alt={product.productName}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{product.productName}</h4>
                        <div className="flex space-x-4">
                          <p className="text-sm text-gray-600 border rounded p-1 mt-1">
                            Brand : {product.productBrand}
                          </p>
                          <p className="text-sm text-gray-600 border rounded p-1 mt-1">
                            Size : {product.productSize}
                          </p>
                          <p className="text-sm text-gray-600 border rounded p-1 mt-1">
                            ProductPrice : ₹{product.productPrice}
                          </p>
                          <p className="text-sm text-gray-600 border rounded p-1 mt-1">
                            SubQuantiy : {product.quantity}
                          </p>
                          <p className="text-sm text-gray-600 border rounded p-1 mt-1">
                            SubTotal : ₹{product.subTotal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Total Quantiy:</span>
                  <span>{invoiceData.totalQuantity}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Gst Tax:</span>
                  <span>18%</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>₹{invoiceData.totalAmount}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="lg:col-span-4 space-y-8  h-[500px] mx-auto">
          <div className="text-center">
            <div className="animate-pulse mb-8">
              <svg
                className="w-24 h-24 mx-auto text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              OrderStatus Not Found
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              The OrderStatus you're looking for doesn't exist or has been
              deleted
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
