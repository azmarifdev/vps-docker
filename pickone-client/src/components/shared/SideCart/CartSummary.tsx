import React from 'react';

interface CartSummaryProps {
    cartTotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartTotal }) => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl shadow-sm border border-blue-100">
            <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="font-medium">৳{cartTotal?.toFixed(0)}</span>
            </div>

            <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 font-medium">Delivery</span>
                <span className="font-medium text-gray-600">To be calculated</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-blue-200">
                <span className="text-gray-800">Total</span>
                <span className="text-blue-700">৳{cartTotal?.toFixed(0)}</span>
            </div>
        </div>
    );
};

export default CartSummary;
