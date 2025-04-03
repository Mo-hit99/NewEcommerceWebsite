import React from "react";

const RefundPolicy = () => {
  return (
    // <section className="container mx-auto px-4 py-8">
    //   <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
    //   <p className="mb-4">
    //     At <strong>[Your E-commerce Company]</strong>, your satisfaction is our top priority. We understand that sometimes a purchase might not meet your expectations. Our refund policy is designed to ensure that you have a hassle-free experience should you need to return a product.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Eligibility for Refunds</h2>
    //   <p className="mb-4">
    //     Refund requests are accepted within <strong>30 days</strong> from the date of purchase. To be eligible for a refund, the product must be in its original condition, unused, and in the original packaging. Certain items, such as personalized or perishable goods, may not be eligible for a refund. Please refer to the product page for specific details.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">How to Initiate a Refund</h2>
    //   <p className="mb-4">
    //     To initiate a refund, please contact our customer support team at{" "}
    //     <a
    //       href="mailto:support@yourecommerce.com"
    //       className="text-blue-600 hover:underline"
    //     >
    //       support@yourecommerce.com
    //     </a>{" "}
    //     with your order number and a brief explanation of your reason for return. Our team will review your request and guide you through the next steps.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Processing Time</h2>
    //   <p className="mb-4">
    //     Once your refund request is approved, please allow <strong>5–10 business days</strong> for the refund to be processed. The refund will be issued to your original method of payment. Note that the actual refund time may vary depending on your bank or credit card provider.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Shipping Costs</h2>
    //   <p className="mb-4">
    //     Please note that shipping costs are non-refundable. If the return is not due to an error on our part, the cost of return shipping may be deducted from your refund amount.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Exchanges</h2>
    //   <p className="mb-4">
    //     If you would prefer to exchange an item for a different size, color, or style, please contact our customer support. Exchanges are subject to product availability and may be processed as a refund followed by a repurchase.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Questions or Concerns</h2>
    //   <p className="mb-4">
    //     If you have any questions about our refund policy or require further assistance, please do not hesitate to contact us at{" "}
    //     <a
    //       href="mailto:support@yourecommerce.com"
    //       className="text-blue-600 hover:underline"
    //     >
    //       support@yourecommerce.com
    //     </a>.
    //   </p>
    //   <p>
    //     Thank you for choosing <strong>[Your E-commerce Company]</strong>. We value your business and strive to ensure a positive shopping experience.
    //   </p>
    // </section>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* <!-- Header Section --> */}
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Your satisfaction is our top priority. We understand that sometimes a purchase might not meet your expectations.</p>
        </div>

        {/* <!-- Main Content --> */}
        <div className="space-y-8">
            {/* <!-- Eligibility Section --> */}
            <div className="bg-blue-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Eligibility for Refunds</h2>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                        <svg className="h-6 w-6 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>30-day return window from purchase date</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="h-6 w-6 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Product must be in original condition</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="h-6 w-6 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Original packaging required</span>
                    </li>
                </ul>
            </div>

            {/* <!-- Process Timeline --> */}
            <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Refund Process</h2>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1 text-center p-4 rounded-lg bg-white shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <h3 className="font-semibold mb-2">Contact Support</h3>
                        <p className="text-sm text-gray-600">Email us with your order details</p>
                    </div>
                    <div className="flex-1 text-center p-4 rounded-lg bg-white shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <h3 className="font-semibold mb-2">Review</h3>
                        <p className="text-sm text-gray-600">We'll review your request</p>
                    </div>
                    <div className="flex-1 text-center p-4 rounded-lg bg-white shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <h3 className="font-semibold mb-2">Processing</h3>
                        <p className="text-sm text-gray-600">5-10 business days for refund</p>
                    </div>
                </div>
            </div>

            {/* <!-- Important Notes --> */}
            <div className="bg-yellow-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h2>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                        <svg className="h-6 w-6 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span>Shipping costs are non-refundable</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="h-6 w-6 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span>Return shipping costs may be deducted</span>
                    </li>
                </ul>
            </div>

            {/* <!-- Contact Support --> */}
            <div className="bg-gray-50 p-6 rounded-xl text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
                <p className="text-gray-600 mb-6">Our support team is here to assist you with any questions.</p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Contact Support
                </button>
            </div>
        </div>
    </div>
</div>
  );
};

export default RefundPolicy;
