import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function TrackOrderStatus() {
  const [steps] = useState([
    "Order Placed",
    "Processed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [invoiceData, setInvoiceData] = useState([]);
  const [UserEmail, setUserEmail] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const { id } = useParams();
  useEffect(() => {
    FetchUserData();
  }, []);
  useEffect(() => {
    fetchInvoiceData();
  }, [id, steps, page]);

  async function fetchInvoiceData() {
    try {
      const response = await axios.get("/api/v1/invoices/payment/invoice", {
        params: {
          page,
          limit: 12,
        },
      });
      if (response) {
        setInvoiceData(response.data.safeGetInvoice);
        setTotalPages(response.data.totalPages);
        console.log(response.data);
        response.data.safeGetInvoice.forEach((invoice) =>
          fetchRemainingdays(invoice)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function FetchUserData() {
    const response = await axios.get("/api/v1/users");
    const CurrentUser = response.data.find((user) => user._id === id);
    if (CurrentUser) {
      setUserEmail(CurrentUser.email);
    } else {
      console.log("User Not Found");
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
  // Filter invoices for the current user
  const filteredInvoices = invoiceData.filter(
    (invoice) => invoice.CustomerEmail === UserEmail
  );

  // Format dates for display
  const dateOption = { month: "short", day: "numeric", year: "numeric" };
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-heading mb-8">Track Order Status</h1>
      {/* Bottom Pagination Buttons */}
      <div className="flex justify-end items-center mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="text-white rounded disabled:cursor-not-allowed"
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
        <span className="text-gray-700 font-medium mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="text-white rounded disabled:cursor-not-allowed"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 shadow">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => {
            const info = deliveryInfo[invoice._id];
            if (!info) {
              return (
                <div key={invoice._id}>
                  Loading delivery info for invoice {invoice.orderId}...
                </div>
              );
            }
            const formattedOrderDate = new Date(
              info.orderDate
            ).toLocaleDateString("en-US", dateOption);
            const formattedExpectedDate = new Date(
              info.expectedDeliveryDate
            ).toLocaleDateString("en-US", dateOption);
            const currentStepIndex = steps.indexOf(invoice.status);

            return (
              <React.Fragment key={invoice.orderId}>
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="font-extrabold text-xl">
                        {invoice.orderId}
                      </h1>
                      <span className="text-primary px-4 py-2 rounded-full bg-primary/10 font-body">
                        In Transit
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-accent">
                      <p>Order Date: {formattedOrderDate}</p>
                      <p>Expected Delivery Date: {formattedExpectedDate}</p>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="relative">
                      <div className="flex justify-between mb-8">
                        {steps.map((step, index) => (
                          <div
                            key={step}
                            className="flex flex-col items-center relative z-10"
                          >
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                                index <= currentStepIndex
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span className="mt-2 text-sm">{step}</span>
                          </div>
                        ))}
                        <div className="absolute top-6 left-0 w-full h-1 bg-muted">
                          <div className="w-3/5 h-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-heading mb-6">Order Items</h2>
                      {invoice.cartItems &&
                        invoice.cartItems.map((productData, index) => (
                          <div className="space-y-4" key={index}>
                            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                              <img
                                src={`${productData.productImg}`}
                                alt="Product"
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-body mb-1">
                                  {productData.productName}
                                </h3>
                                <p className="text-accent text-sm">
                                  Size: {productData.productSize}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-body">
                                  ₹{productData.productPrice}
                                </p>
                                <p className="text-accent text-sm">
                                  Qty: {productData.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="lg:col-span-1 space-y-8">
                    <div className="bg-card p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-heading mb-6">
                        Order Summary
                      </h2>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-accent">Total Quantity</span>
                          <span className="font-body">
                            {invoice.totalQuantity}
                          </span>
                        </div>
                        <div className="pt-4 border-t border-border">
                          <div className="flex justify-between">
                            <span className="font-heading">Total</span>
                            <span className="font-heading">
                              ₹{invoice.totalAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-heading mb-6">
                        Shipping Details
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-accent mb-2">Delivery Address</h3>
                          <p className="font-body">{invoice.CustomerAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </React.Fragment>
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
    </div>
  );
}
