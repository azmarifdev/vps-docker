"use client";
import React, {useState, useEffect} from "react";
import {FiSearch} from "react-icons/fi";
import Loader from "@/components/reusable/Loader/Loader";
import {
    useGetReviewsQuery,
    useApproveReviewMutation,
    useRejectReviewMutation,
    useDeleteReviewMutation,
} from "@/redux/api/reviewApi";
import NotFound from "@/components/shared/NotFound";
import Pagination from "@/components/shared/Pagination";
import ReviewTable from "./components/ReviewTable";
import ConfirmationModal from "./components/ConfirmationModal";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ReviewDetailsModal from "./components/ReviewDetailsModal";

const Reviews = () => {
    const [activeTab, setActiveTab] = useState<string | "all">("all");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // RTK Query hooks
    const [approveReview] = useApproveReviewMutation();
    const [rejectReview] = useRejectReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();

    // State for modals
    const [currentReview, setCurrentReview] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{
        type: "approve" | "reject" | "delete";
        reviewId: string;
        title: string;
        description: string;
    } | null>(null);

    // Debounce effect for search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Construct query parameters
    let queries = `page=${currentPage}&limit=${itemsPerPage}`;
    if (activeTab !== "all") queries += `&status=${activeTab}`;
    if (debouncedSearchTerm) queries += `&search=${debouncedSearchTerm}`;

    // Fetch reviews
    const {
        data: reviews,
        isLoading,
        isFetching,
    } = useGetReviewsQuery({query: queries});

    // Calculate total pages
    useEffect(() => {
        if (reviews?.meta?.total) {
            setTotalPages(Math.ceil(reviews?.meta.total / itemsPerPage));
        }
    }, [reviews?.meta?.total, itemsPerPage]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, activeTab, debouncedSearchTerm]);

    const handleAction = (
        type: "approve" | "reject" | "delete" | "view",
        review: any
    ) => {
        if (type === "view") {
            setCurrentReview(review);
            setIsViewModalOpen(true);
            return;
        }

        let title = "";
        let description = "";

        switch (type) {
            case "approve":
                title = "Approve Review";
                description = "Are you sure you want to approve this review?";
                break;
            case "reject":
                title = "Reject Review";
                description = "Are you sure you want to reject this review?";
                break;
            case "delete":
                title = "Delete Review";
                description =
                    "Are you sure you want to delete this review? This action cannot be undone.";
                break;
        }

        setConfirmAction({
            type,
            reviewId: review._id,
            title,
            description,
        });
        setIsConfirmModalOpen(true);
    };

    const handleConfirmAction = async () => {
        if (!confirmAction) return;

        try {
            switch (confirmAction.type) {
                case "approve":
                    await approveReview(confirmAction.reviewId).unwrap();
                    break;
                case "reject":
                    await rejectReview(confirmAction.reviewId).unwrap();
                    break;
                case "delete":
                    await deleteReview(confirmAction.reviewId).unwrap();
                    break;
            }
            setIsConfirmModalOpen(false);
            setConfirmAction(null);
        } catch (error) {
            console.error("Action failed:", error);
        }
    };

    return (
        <>
            <h2 className="text-2xl mb-8">Manage Reviews</h2>

            <div className="flex justify-between gap-x-6 gap-y-4 mb-5 flex-wrap">
                <div className="relative w-full max-w-[450px]">
                    <input
                        type="text"
                        id="search"
                        placeholder="Search by product, customer..."
                        className="input-field placeholder:text-gray-400 pl-8 py-2 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch
                        size={18}
                        className="text-primary absolute top-3 left-2"
                    />
                </div>

                <div className="w-full max-w-full md:max-w-[400px]">
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) =>
                            setActiveTab(value as string | "all")
                        }
                        className="w-full !p-0.5">
                        <TabsList
                            className="w-full p-1"
                            style={{
                                borderRadius: "6px",
                                border: "1px solid #D1D4D8",
                            }}>
                            <TabsTrigger
                                className="w-32 h-8 p-2.5 rounded data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                                value="all">
                                All
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-32 h-8 p-2.5 rounded data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                                value="pending">
                                Pending
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-32 h-8 p-2.5 rounded data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                                value="approved">
                                Approved
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-32 h-8 p-2.5 rounded data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                                value="rejected">
                                Rejected
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {isLoading || isFetching ? (
                <Loader />
            ) : reviews?.data?.length === 0 ? (
                <NotFound message="No reviews available." />
            ) : (
                <ReviewTable data={reviews?.data} handleAction={handleAction} />
            )}

            {reviews?.meta?.total > 5 && (
                <div className="mt-10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        setItemsPerPage={setItemsPerPage}
                    />
                </div>
            )}

            {/* Review Details Modal */}
            <ReviewDetailsModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                review={currentReview}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                dialogOpen={isConfirmModalOpen}
                setDialogOpen={setIsConfirmModalOpen}
                dialogAction={{
                    title: confirmAction?.title || "",
                    description: confirmAction?.description || "",
                    type:
                        confirmAction?.type === "delete" ? "delete" : "default",
                }}
                handleConfirmAction={handleConfirmAction}
            />
        </>
    );
};

export default Reviews;
