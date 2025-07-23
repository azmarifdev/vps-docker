import React from "react";

type SpecificationItem = {
    key: string;
    value: string;
};

const SpecificationTabContent = ({
    specifications,
}: {
    specifications: SpecificationItem[];
}) => {
    return (
        <div className="prose max-w-none text-gray-600">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Technical Specifications
            </h4>
            {specifications && specifications.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full mb-4">
                        <tbody>
                            {specifications.map((spec, index) => (
                                <tr
                                    key={index}
                                    className={
                                        index < specifications.length - 1
                                            ? "border-b"
                                            : ""
                                    }>
                                    <td className="py-2 font-medium">
                                        {spec.key}
                                    </td>
                                    <td className="py-2">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 italic">
                    No specifications available.
                </p>
            )}
        </div>
    );
};

export default SpecificationTabContent;
