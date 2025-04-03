import { useState } from "react";
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Addproducts() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [productImg , setProductImg] = useState([])
  const [sizes,setSizes] = useState([])
  const [productData,setProductData] = useState({
    productName : '',
    brand : '',
    category : '',
    price : '',
    discount : '',
    productDescription : '',
  })
  
  // product data handler
  const productDataHandler = (e) => {
   const {name , value} = e.target
   setProductData({
    ...productData,
    [name]:value
   })
  }
  // img file handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImg(files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(imagePreviews);
  };

  // Remove image preview by index and update both state arrays
  const handleRemoveImage = (indexToRemove) => {
    // Revoke the object URL for cleanup
    URL.revokeObjectURL(selectedImages[indexToRemove]);

    // Remove the image preview
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );

    // Remove the corresponding file and return the filtered array
    setProductImg((prevImgSelected) =>
      prevImgSelected.filter((_, index) => index !== indexToRemove)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productName',productData.productName)
      formData.append('brand',productData.brand)
      formData.append('category',productData.category)
      formData.append('price',productData.price)
      formData.append('discount',productData.discount)
      formData.append('description', productData.productDescription)
      
      // Append the image files to the FormData
      productImg.forEach((file) => {
        formData.append("image", file);
      });
    sizes.forEach((size)=>{
      formData.append("sizes",size)

    })
    
    const response = await axios.post('/api/v1/products/productData', formData ,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if(response){
      setProductData( {  productName : '',
        brand : '',
        category : '',
        price : '',
        discount : '',
        productDescription : '',
      })
      setSizes('')
      setProductImg(null)
      toast.success("Product Added Successfully");
    }
  } catch (error) {
   console.log(error) 
   toast.error(error.response.data.message) 
  }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <ToastContainer />
        <div className="bg-white shadow rounded p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Add New Product
          </h1>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            {/* <!-- Grid container for basic details --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <!-- Product Name --> */}
              <div>
                <label
                  htmlFor="productName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Enter product name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={productData.productName}
                  onChange={productDataHandler}
                />
              </div>

              {/* <!-- Brand --> */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="Enter brand name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={productData.brand}
                  onChange={productDataHandler}
                />
              </div>

              {/* <!-- Category --> */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={productData.category}
                  onChange={productDataHandler}
                />
              </div>

              {/* <!-- Sizes --> */}
              <div>
                <label
                  htmlFor="sizes"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Sizes
                </label>
                <input
                  type="text"
                  name="sizes"
                  placeholder="Enter sizes (S,M,L,XL,XXL,2XXL)"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value.split(","))}
                />
              </div>

              {/* <!-- Price --> */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={productData.price}
                  onChange={productDataHandler}
                />
              </div>

              {/* <!-- Discount --> */}
              <div>
                <label
                  htmlFor="discount"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Discount
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="discount"
                  name="discount"
                  placeholder="Optional"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={productData.discount}
                  onChange={productDataHandler}
                />
              </div>
            </div>

            {/* <!-- Product Description --> */}
            <div className="mt-6">
              <label
                htmlFor="productDescription"
                className="block text-gray-700 font-medium mb-2"
              >
                Product Description
              </label>
              <textarea
                id="description"
                name="productDescription"
                rows="5"
                placeholder="Enter detailed product description"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productData.productDescription}
                 onChange={productDataHandler}
              ></textarea>
            </div>

            {/* <!-- Product Images --> */}
            {/* <!-- Styled Image Input --> */}
            <div className="mt-6">
              <div className="flex items-center">
                {/* <!-- Custom Button as a Label --> */}
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Choose Images
                </label>
              </div>
              {/* <!-- Hidden File Input --> */}
              <input
                type="file"
                id="image"
                name="image"
                multiple
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* <!-- Preview Selected Images --> */}
            <div className="mt-4 flex flex-wrap gap-4">
              {selectedImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-[100px] h-[100px] object-contain hover:border-solid hover:border-blue-500 border rounded"
                  />
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-[10px] -right-[10px] bg-red-500 hover:bg-red-600 text-black rounded-full w-6 h-6 flex items-center justify-center text-lg"
                    title="Remove Image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* <!-- Submit Button --> */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-blue-600 w-full text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition duration-300"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
