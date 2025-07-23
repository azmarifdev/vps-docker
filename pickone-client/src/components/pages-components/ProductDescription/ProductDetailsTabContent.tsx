import ConvertHtml from '@/components/reusable/ConvertHtml';
import React from 'react';

type props = {
    main_features?: string;
    important_note?: string;
};

const ProductDetailsTabContent: React.FC<props> = ({ main_features, important_note }) => {
    return (
        <div className="prose max-w-none text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {main_features && (
                    <div className="bg-blue-50 p-3 md:p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                        <h3 className="text-xl font-semibold text-blue-700 flex items-center mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Main features
                        </h3>
                        <div>
                            <ConvertHtml content={main_features} />
                        </div>
                    </div>
                )}

                {important_note && (
                    <div className="bg-blue-50 p-3 md:p-4 rounded-lg mb-6 border-l-4 border-green-500">
                        <h3 className="text-xl font-semibold text-green-600 flex items-center mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Important Note
                        </h3>
                        <div>
                            <ConvertHtml content={important_note} />
                        </div>
                    </div>
                )}

                {!main_features && !important_note && (
                    <>
                        <p>No features or important notes available.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsTabContent;
