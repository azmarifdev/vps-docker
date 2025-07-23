import React from "react";
import {format} from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";

interface ReviewDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: any | null;
}

const ReviewDetailsModal: React.FC<ReviewDetailsModalProps> = ({
    isOpen,
    onClose,
    review,
}) => {
    if (!review) return null;

    // Render status badge with appropriate color
    const renderStatusBadge = (status: string) => {
        let customClass = "";

        switch (status) {
            case "pending":
                customClass =
                    "bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-100";
                break;
            case "approved":
                customClass =
                    "bg-green-50 text-green-600 border-green-300 hover:bg-green-100";
                break;
            case "rejected":
                customClass =
                    "bg-red-50 text-red-600 border-red-300 hover:bg-red-100";
                break;
        }

        return <Badge className={`${customClass} px-2 py-1`}>{status}</Badge>;
    };

    // Render star rating
    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${
                            i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                <span className="ml-2 text-sm font-medium">{rating}/5</span>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Review Details</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 py-4">
                    {/* Product information */}
                    <div className="flex items-start gap-4">
                        <Image
                            src={
                                review.product_id?.thumbnail ||
                                "https://placehold.co/100x100"
                            }
                            alt={review.product_id?.title}
                            width={100}
                            height={100}
                            className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-medium text-lg">
                                {review.product_id?.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Product Code: {review?.product_id?.code}
                            </p>
                        </div>
                    </div>

                    {/* Reviewer information */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">
                                Customer
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    <span className="text-lg font-medium text-gray-600">
                                        {review?.name?.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {review?.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500">
                                Review Date
                            </h4>
                            <p className="mt-1">
                                {review.createdAt &&
                                    format(
                                        new Date(review.createdAt),
                                        "MMM dd, yyyy"
                                    )}
                            </p>
                        </div>
                    </div>

                    {/* Rating and Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">
                                Rating
                            </h4>
                            <div className="mt-1">
                                {renderRating(review.rating)}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500">
                                Status
                            </h4>
                            <div className="mt-1">
                                {renderStatusBadge(review.status)}
                            </div>
                        </div>
                    </div>

                    {/* Review comment */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">
                            Comment
                        </h4>
                        <p className="mt-1 whitespace-pre-line p-4 bg-gray-50 rounded-md">
                            {review?.message ?? "No comment provided."}
                        </p>
                    </div>

                    <div>
                        {review?.images && review.images.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">
                                    Images
                                </h4>
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                    {review?.images.map(
                                        (image: string, index: number) => (
                                            <Image
                                                key={index}
                                                src={image}
                                                alt={`Review Image ${
                                                    index + 1
                                                }`}
                                                width={100}
                                                height={100}
                                                className="w-full h-auto object-cover rounded-md"
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewDetailsModal;
