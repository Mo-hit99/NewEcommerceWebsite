import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  clearCart,
  removeToCart,
  subtractQuantityItems,
  updateQuantityItems,
} from "../redux/cartSlice";

export default function Cart() {
  const [addressData, setAddressData] = useState({
    addressTitle: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState("");
  const [gst ,setGst] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserEmail = localStorage.getItem("email");
  const cart = useSelector((state) => state.cart);
  const [currentUserId, setCurrentUserId] = useState("");
  const [userData, setUserData] = useState("");
  function handleRemoveCart(cartItem) {
    dispatch(removeToCart(cartItem));
  }

  function updateItems(cartItem) {
    dispatch(updateQuantityItems(cartItem));
  }

  function subtractItems(cartItem) {
    dispatch(subtractQuantityItems(cartItem));
  }
  function continueShopping() {
    return navigate("/Products");
  }
  useEffect(() => {
    FetchUserData();
  }, [UserEmail]);

  useEffect(() => {
    getGst();
  },[]);
  async function getGst(){
    const response = await axios.get("/api/v1/gsts/gst");
    setGst(response.data.gst);
  }
  const sellingPrice = (cart.cartTotalAmount * gst) / 100;
  async function FetchUserData() {
    const response = await axios.get("/api/v1/users");
    const CurrentUser = response.data.find((user) => user.email === UserEmail);
    if (CurrentUser) {
      setCurrentUserId(CurrentUser._id);
      setUserData(CurrentUser);
    }
  }
  async function handleAddress(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/users/${currentUserId}/address`,
        {
          email: UserEmail,
          addressTitle: addressData.addressTitle,
          address: addressData.address,
          city: addressData.city,
          state: addressData.state,
          zipCode: addressData.zipCode,
        }
      );

      if (response) {
        setAddressData({
          addressTitle: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
        });
        setError("");
        FetchUserData();
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
    }
  }
  function addressInputHandler(e) {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
    setError("");
  }

  // invoice creation
  async function createInvoice(paymentId) {
    try {
      const invoiceData = {
        paymentId,
        customerName: userData.name, // adjust according to your user data
        customerEmail: UserEmail,
        customerAddress: `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}`, // you may choose the selected address
        cartItems: cart.cartItems.map((item) => ({
          productId: item.productId,
          productName: item.product.productName,
          productDescription: item.product.productDescription,
          productBrand: item.product.brand,
          productSize: item.selectedSize,
          productPrice: item.product.price,
          productImg: item.product.imageUrl[0],
          quantity: item.quantity,
          subTotal: item.quantity * item.product.price,
        })),
        totalQuantity: cart.cartTotalQuantity,
        totalAmount: sellingPrice,
      };
      await axios.post("/api/v1/invoices/payment/createinvoice", invoiceData);
    } catch (error) {
      console.log(error);
    }
  }
  // razorpay gatway handler
  async function handlePayment() {
    if (!selectedAddress) {
      toast.error("Please select a shipping address before checkout.");
      return;
    }
    try {
      const response = await axios.post(`/api/v1/razorpay/payment/order`, {
        amount:sellingPrice,
      });
      if (response) {
        await handlePaymentVerify(response.data.data);
        // setPaymentId(response.data.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MOHIT",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          await axios.post(`/api/v1/razorpay/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          await createInvoice(response.razorpay_payment_id);
          dispatch(clearCart());
          navigate(`/orderstatus/${currentUserId}`);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  function handleSubmit(e) {
    e.preventDefault();

    handlePayment();
  }
  return (
    <div className="container mx-auto mt-10">
       <ToastContainer />
      {cart.cartItems.length === 0 ? (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-md w-full mx-auto p-8 text-center">
            <div className="mb-8 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                width={100}
                height={100}
                className="w-24 h-24 mx-auto"
              >
                <path fill="#FFB0AA" d="M195 10h160v137H195z" />
                <path
                  fill="#6E83B7"
                  d="m440 360 62-213H119.373L94.734 40H10v32h59.266L136 361.818V440h304v-32H168v-48z"
                />
                <circle fill="#EDEFF1" cx="168" cy="455" r="47" />
                <circle fill="#D3D3D3" cx="168" cy="455" r="20" />
                <circle fill="#EDEFF1" cx="366.286" cy="455" r="47" />
                <circle fill="#D3D3D3" cx="366.286" cy="455" r="20" />
                <path fill="#FFE352" d="M146 49h98v98h-98z" />
                <g>
                  <path fill="#FFB236" d="m211 81-16-6-16 6V49h32z" />
                </g>
                <g>
                  <path fill="#FF7B7B" d="m296 52-21-8-21 8V10h42z" />
                </g>
                <g>
                  <path fill="#80D6FB" d="M320 77h120v70H320z" />
                </g>
                <g>
                  <path fill="#46BEE8" d="m396 109-16-6-16 6V77h32z" />
                </g>
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h1>

            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added anything to your cart yet
            </p>

            <button
              onClick={continueShopping}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg
                       transform transition duration-200 hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                       shadow-lg hover:shadow-xl active:scale-95"
              aria-label="Continue Shopping"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="sm:flex shadow my-10">
          <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cart.cartTotalQuantity} Items
              </h2>
            </div>
            <div className="dark:bg-gray-900">
              <div className="w-full max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg  border dark:border-gray-700">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Checkout
                  </h1>
                  {error && (
                    <p className="bg-red-500 rounded text-center text-white p-2">
                      {error}
                    </p>
                  )}
                  <form className="mb-6" onSubmit={handleAddress}>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          Address Title
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          placeholder="Home, Work ..."
                          name="addressTitle"
                          onChange={addressInputHandler}
                          value={addressData.addressTitle}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 dark:text-white mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                        name="address"
                        onChange={addressInputHandler}
                        value={addressData.address}
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="city"
                        className="block text-gray-700 dark:text-white mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                        name="city"
                        onChange={addressInputHandler}
                        value={addressData.city}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          name="state"
                          onChange={addressInputHandler}
                          value={addressData.state}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zip"
                          className="block text-gray-700 dark:text-white mb-1"
                        >
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                          name="zipCode"
                          onChange={addressInputHandler}
                          value={addressData.zipCode}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="py-2 px-4 rounded bg-blue-500 text-white mx-auto w-full hover:bg-blue-400">
                        Save
                      </button>
                    </div>
                  </form>
                  <div className="flex">
                    <div className="flex w-[38rem] flex-col rounded">
                      <div className="flex w-full flex-col pb-8 pt-4">
                        <div className="relative mb-4">
                          {userData &&
                          userData.address &&
                          userData.address.length > 0 ? (
                            userData.address
                              .filter(
                                (userData) => userData.email === UserEmail
                              )
                              .map((userAddress, index) => (
                                <div key={userAddress._id} className="relative mb-4">
                                  <input
                                    className="peer hidden"
                                    id={`address_${index}`}
                                    type="radio"
                                    name="selectedAddress"
                                    checked={
                                      selectedAddress &&
                                      selectedAddress._id === userAddress._id
                                    }
                                    onChange={() =>
                                      setSelectedAddress(userAddress)
                                    }
                                  />
                                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white  peer-checked:bg-white peer-checked:border-blue-500"></span>
                                  <label
                                    className="flex cursor-pointer flex-col rounded border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16"
                                    htmlFor={`address_${index}`}
                                  >
                                    {/* <span
                                      className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2
                                       rounded-full border-8 border-gray-300 bg-white 
                                     peer-checked:bg-blue-500 peer-checked:border-blue-500"
                                    /> */}
                                    <span className="mb-2 text-lg font-semibold">
                                      {userAddress.addressTitle}
                                    </span>
                                    <p className="text-sm sm:text-base">
                                      {userAddress.address} {userAddress.city}{" "}
                                      {userAddress.state} {userAddress.zipCode}
                                    </p>
                                  </label>
                                </div>
                              ))
                          ) : (
                            <p>No saved addresses</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
              {cart.cartItems.map((Items) => (
                <>
                  <div
                    key={Items.product._id}
                    className="md:w-4/12 2xl:w-1/4 w-full"
                  >
                    <img
                      src={`${Items.product.imageUrl[0]}`}
                      alt={Items.product.imageUrl[0]}
                      className="h-full object-center object-cover "
                    />
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 mt-2">
                      Brand:{Items.product.brand}
                    </p>
                    <p className="text-xs leading-3 text-gray-800 md:pt-0  mt-2">
                      Name:{Items.product.productName}
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base font-black leading-none text-gray-800">
                        {Items.product.ProductName}
                      </p>
                      <div className="relative">
                        <p className="text-blue-gray-700 absolute -left-10 bottom-0">
                          {Items.quantity}
                        </p>
                        <button
                          className="absolute h-8 w-8 right-10 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-gray-200"
                          type="button"
                          onClick={() => subtractItems(Items.product._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14"
                            />
                          </svg>
                        </button>
                        <button
                          className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-gray-200"
                          type="button"
                          onClick={() => updateItems(Items.product._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* <p className="text-xs leading-3 text-gray-600 pt-2">
                Height: 10 inches
              </p> */}
                    <p className="text-xs leading-3 text-gray-600 py-4">
                      Size: {Items.selectedSize}
                    </p>
                    <div className="flex items-center justify-between pt-5 mb-2">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveCart(Items.product._id)}
                          className="text-xs leading-3 underline text-red-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800">
                        ₹ {Items.product.price}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <NavLink
              to={"/products"}
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </NavLink>
          </div>
          <form
            onSubmit={handleSubmit}
            id="summary"
            className=" w-full   sm:w-1/4   md:w-1/2      px-8 py-10"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm">
                Total Items: {cart.cartTotalQuantity}
              </span>
            </div>
            <div>
              <p className="font-medium inline-block mb-3 text-sm uppercase">
                GST
              </p>
              <p className="block p-2 text-gray-600 w-full text-sm">
                {gst.toString()}%
              </p>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₹{sellingPrice}</span>
              </div>
              <button className="bg-blue-500 font-semibold hover:bg-blue-400 py-3 text-sm text-white uppercase w-full rounded">
                Checkout
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
