import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">ShopHub</h2>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to ShopHub, your premier destination for online shopping. We provide a seamless 
              e-commerce experience with a wide range of products, secure transactions, and excellent customer service.
            </p>
            
            <div className="border-t pt-6">
              <p className="text-xl font-medium text-gray-800">
                This is made by <span className="text-blue-600 font-bold">Sankalp Suman</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 