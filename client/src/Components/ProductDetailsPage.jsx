import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../redux/cartSlice";
export default function ProductDetailsPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productDataById, setProductDataById] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectToLogin = useSelector((state) => state.cart.redirectToLogin);
  const { id } = useParams();
  useEffect(() => {
    if (redirectToLogin) {
      navigate("/login");
      dispatch(clearCart());
    }
  }, [redirectToLogin, navigate, dispatch]);

  useEffect(() => {
    fetchProductById();
  }, [id]);
  async function fetchProductById() {
    try {
      const response = await axios.get(`/api/v1/products/productData/${id}`);

      if (response) {
        setProductDataById(response.data);
        // If the fetched product data includes a sizes array, set the default selected size
        if (response?.data?.imageUrl && response.data?.imageUrl?.length > 0) {
          setSelectedImage(response.data?.imageUrl[0]);
        }
        // If the fetched product data includes a sizes array, set the default selected size
        if (response?.data?.sizes && response?.data?.sizes?.length > 0) {
          setSelectedSize(response?.data?.sizes[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={`${selectedImage}`}
                alt={productDataById._id}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productDataById?.imageUrl?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:border-blue-500  ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={`${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">
                    {productDataById.productName}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  {productDataById.brand}
                </h1>
                <div className="flex items-center gap-2">
                  {/* <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-300 dark:text-gray-600 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (42 reviews)
                  </span> */}
                </div>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  ₹{productDataById.discount}
                </span>
                <span className="text-lg md:text-xl text-gray-400 line-through">
                  ₹{productDataById.price}
                </span>
              </div>
              {/* <div className="text-3xl font-bold">₹ 
              {productDataById.price}</div> */}
            </div>
            {/* <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-primary p-0.5">
                  <span className="block w-full h-full bg-white rounded" />
                </button>
                <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
                  <span className="block w-full h-full bg-gray-200 rounded" />
                </button>
                <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
                  <span className="block w-full h-full bg-black rounded" />
                </button>
              </div>
            </div> */}
            <div>
              {/* <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Size</h3>
                <button className="text-primary text-sm">Size guide</button>
              </div> */}
              <div className="grid grid-cols-4 gap-2">
                {productDataById?.sizes?.map((size) => (
                  <button
                    key={size}
                    // Step 4: Update the selected size when a button is clicked
                    onClick={() => setSelectedSize(size)}
                    // Step 3: Apply default styling conditionally based on selectedSize
                    className={`py-3 border rounded-lg hover:border-blue-500 ${
                      // When the button is selected, apply a blue border;
                      // Otherwise, use a default gray border.
                      selectedSize === size
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      productId: productDataById._id,
                      quantity: 1,
                      product: productDataById,
                      selectedSize,
                    })
                  )
                }
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-400"
              >
                Add to cart
              </button>
              <button className="w-14 h-14 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div>
              {/* <div>
                    <span className="font-bold text-gray-700 text-xl">Product Description:</span>
                    <p className="text-gray-600 text-lg mt-2">
                       {productDataById.description}
                    </p>
                </div> */}
              <div className="w-full mx-auto p-4">
                {/* Product Description Dropdown */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex w-full items-center justify-between py-3 text-lg font-semibold text-gray-800"
                  >
                    Product Description
                    <span
                      className={`transform transition-transform duration-300 ${
                        showDescription ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                      >
                        <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      showDescription
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <p className="p-3 text-gray-600">
                      {productDataById.description}
                    </p>
                  </div>
                </div>

                {/* Shipping Details Dropdown */}
                <div className="border-b border-gray-300 mt-4">
                  <button
                    onClick={() => setShowShipping(!showShipping)}
                    className="flex w-full items-center justify-between py-3 text-lg font-semibold text-gray-800"
                  >
                    Shipping & Delivery
                    <span
                      className={`transform transition-transform duration-300 ${
                        showShipping ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                      >
                        <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      showShipping
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <p className="p-3 text-gray-600">
                      Free shipping on orders over $50. Estimated delivery
                      within 3-5 business days. Express shipping options are
                      also available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button className="px-4 py-2 text-blue-gray-700">Reviews</button>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">ARK customer</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Yesterday
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Excellent running shoes. It turns very sharply on the foot.
                    good to buy from Zudioo.
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      42
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 11v-9m-7 10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      0
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-primary">4.8</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-900"
                        style={{ width: "90%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      28
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-900"
                        style={{ width: "70%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      9
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-900"
                        style={{ width: "40%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      4
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-900"
                        style={{ width: "20%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      1
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-900"
                        style={{ width: "10%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
      {/* <aside className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-2">
            Popular brands with discounts over 25%
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Check out our featured brands with amazing discounts
          </p>
        </div>
      </aside> */}
    </section>
  );
}
