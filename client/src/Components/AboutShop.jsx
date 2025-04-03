export default function AboutShop() {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">About Our Business</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556742205-e10c9486e506?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Our Workshop"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3">Quality Craftsmanship</h3>
          <p className="text-gray-600 mb-4">
            For over 20 years, we've been creating handcrafted products using traditional 
            techniques combined with modern innovation. Our artisans take pride in every 
            detail of the manufacturing process.
          </p>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Read More →
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Our Team"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3">Dedicated Team</h3>
          <p className="text-gray-600 mb-4">
            Our passionate team of designers and craftspeople work together to bring 
            you unique products that combine functionality with aesthetic appeal. 
            Customer satisfaction is our top priority.
          </p>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Read More →
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Our Materials"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3">Sustainable Materials</h3>
          <p className="text-gray-600 mb-4">
            We source eco-friendly materials from certified suppliers, ensuring 
            minimal environmental impact while maintaining the highest quality 
            standards in all our products.
          </p>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Read More →
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
