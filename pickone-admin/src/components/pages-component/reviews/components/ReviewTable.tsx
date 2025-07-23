/* eslint-disable no-unused-vars */
// components/review/ReviewTable.tsx
import React from "react";
import {format} from "date-fns";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import {Switch} from "@/components/ui/switch";
import {useTogglePublishMutation} from "@/redux/api/reviewApi";

interface ReviewTableProps {
    data: any[];
    handleAction: (
        type: "approve" | "reject" | "delete" | "view",
        review: any
    ) => void;
}

const ReviewTable = ({data, handleAction}: ReviewTableProps) => {
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

    const [togglePublish] = useTogglePublishMutation();

    const handlePublishedChange = async (id: string, isPublished: boolean) => {
        await togglePublish(id).unwrap();
    };

    // Render star rating
    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${
                            i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                <span className="ml-1 text-sm font-medium">{rating}/5</span>
            </div>
        );
    };

    return (
        <Table className="text-base font-normal text-black capitalize">
            <TableHeader className="!bg-[#DFE3FA]">
                <TableRow className="border-none">
                    <TableHead className="rounded-l-lg py-4 pl-10">
                        SI
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>

                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="rounded-r-lg py-4 pr-10">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((review: any, index: number) => (
                    <TableRow key={review?._id}>
                        <TableCell className="py-4 pl-10">
                            {index + 1}
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={
                                        review?.product_id?.thumbnail ||
                                        "https://placehold.co/50x50"
                                    }
                                    alt={review?.product_id?.title}
                                    width={50}
                                    height={50}
                                    className="w-10 h-10 object-cover rounded-md"
                                />
                                <span className="font-medium line-clamp-1">
                                    {review?.product_id?.title?.length > 20
                                        ? `${review?.product_id?.title.slice(
                                              0,
                                              20
                                          )}...`
                                        : review?.product_id?.title}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div>
                                <div className="font-medium">
                                    {review?.name}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{renderRating(review?.rating)}</TableCell>

                        <TableCell>
                            {review?.createdAt &&
                                format(
                                    new Date(review.createdAt),
                                    "MMM dd, yyyy"
                                )}
                        </TableCell>
                        <TableCell>
                            {renderStatusBadge(review?.status)}
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id={`publish-switch-${review.id}`}
                                    checked={review?.is_published || false}
                                    disabled={review?.status !== "approved"}
                                    onCheckedChange={(checked) =>
                                        handlePublishedChange(
                                            review?._id,
                                            checked
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`publish-switch-${review.id}`}
                                    className="text-sm">
                                    {review?.is_published
                                        ? "Published"
                                        : "Not Published"}
                                </label>
                            </div>
                        </TableCell>
                        <TableCell className="py-4 pr-10">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-500 !text-blue-500 font-semibold"
                                    onClick={() =>
                                        handleAction("view", review)
                                    }>
                                    View
                                </Button>
                                {review?.status === "pending" && (
                                    <>
                                        <Button
                                            size="sm"
                                            className="font-semibold bg-green-500 text-white hover:bg-green-600"
                                            onClick={() =>
                                                handleAction("approve", review)
                                            }>
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={"outline"}
                                            className="border-red-500 !text-red-500 font-semibold"
                                            onClick={() =>
                                                handleAction("reject", review)
                                            }>
                                            Reject
                                        </Button>
                                    </>
                                )}
                                <Button
                                    size="sm"
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                                    onClick={() =>
                                        handleAction("delete", review)
                                    }>
                                    Delete
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ReviewTable;
