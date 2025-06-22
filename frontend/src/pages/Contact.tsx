import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="text-6xl text-gray-300 mb-4">📞</div>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">No Contact</h2>
            <p className="text-lg text-gray-600">
              Currently, we are not accepting contact requests. 
              Please check back later for contact information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 