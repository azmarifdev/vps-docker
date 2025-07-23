// app/(dashboard)/order/page.tsx
"use client";
import React, {useState, useEffect} from "react";
import {FiSearch} from "react-icons/fi";
import Loader from "@/components/reusable/Loader/Loader";
import {
    useGetOrdersQuery,
    useApproveOrderMutation,
    useCompleteOrderMutation,
    useCancelOrderMutation,
    useDeleteOrderMutation,
} from "@/redux/api/orderApi";
import NotFound from "@/components/shared/NotFound";
import Pagination from "@/components/shared/Pagination";
import OrderTable from "./components/OrderTable";
import ConfirmationModal from "./components/ConfirmationModal";
// import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import OrderDetailsModal from "./components/OrderDetailsModal";

const Order = () => {
    // const [activeTab, setActiveTab] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // RTK Query hooks
    const [approveOrder] = useApproveOrderMutation();
    const [completeOrder] = useCompleteOrderMutation();
    const [cancelOrder] = useCancelOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    // State for modals
    const [currentOrder, setCurrentOrder] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{
        type: "approve" | "complete" | "cancel" | "delete";
        orderId: string;
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
    // if (activeTab !== "all") queries += `&status=${activeTab}`;
    if (debouncedSearchTerm) queries += `&search=${debouncedSearchTerm}`;

    // Fetch orders
    const {
        data: orders,
        isLoading,
        isFetching,
    } = useGetOrdersQuery({query: queries});

    // Calculate total pages
    useEffect(() => {
        if (orders?.meta?.total) {
            setTotalPages(Math.ceil(orders?.meta.total / itemsPerPage));
        }
    }, [orders?.meta?.total, itemsPerPage]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, debouncedSearchTerm]);

    const handleAction = (
        type: "approve" | "complete" | "cancel" | "delete" | "view",
        order: any
    ) => {
        if (type === "view") {
            setCurrentOrder(order);
            setIsViewModalOpen(true);
            return;
        }

        let title = "";
        let description = "";

        switch (type) {
            case "approve":
                title = "Approve Order";
                description = "Are you sure you want to approve this order?";
                break;
            case "complete":
                title = "Complete Order";
                description =
                    "Are you sure you want to mark this order as completed?";
                break;
            case "cancel":
                title = "Cancel Order";
                description = "Are you sure you want to cancel this order?";
                break;
            case "delete":
                title = "Delete Order";
                description =
                    "Are you sure you want to delete this order? This action cannot be undone.";
                break;
        }

        setConfirmAction({type, orderId: order._id, title, description});
        setIsConfirmModalOpen(true);
    };

    const handleConfirmAction = async () => {
        if (!confirmAction) return;

        try {
            switch (confirmAction.type) {
                case "approve":
                    await approveOrder(confirmAction.orderId).unwrap();
                    break;
                case "complete":
                    await completeOrder(confirmAction.orderId).unwrap();
                    break;
                case "cancel":
                    await cancelOrder(confirmAction.orderId).unwrap();
                    break;
                case "delete":
                    await deleteOrder(confirmAction.orderId).unwrap();
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
            <h2 className="text-2xl mb-8">Manage Orders</h2>

            <div className="flex justify-between gap-x-6 gap-y-4 mb-5">
                <div className="relative w-full max-w-[450px]">
                    <input
                        type="text"
                        id="search"
                        placeholder="Search by product, customer , order id..."
                        className="input-field placeholder:text-gray-400 pl-8 py-2 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch
                        size={18}
                        className="text-primary absolute top-3 left-2"
                    />
                </div>

                {/* <div className="w-full max-w-full md:max-w-[450px]">
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value)}
                        className="w-full !p-0.5">
                        <TabsList
                            className="w-full p-1"
                            style={{
                                borderRadius: "6px",
                                border: "1px solid #D1D4D8",
                            }}>
                            <TabsTrigger
                                className="!w-32 h-8 p-2.5 rounded data-[state=active]:bg-blue-500 data-[state=active]:text-white"
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
                                value="processing">
                                Processing
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-32 h-8 p-2.5 rounded data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                                value="completed">
                                Completed
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-32 h-8 p-2.5 rounded data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                                value="cancelled">
                                Cancelled
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div> */}
            </div>

            {isLoading || isFetching ? (
                <Loader />
            ) : orders?.data?.length === 0 ? (
                <NotFound message="No orders available." />
            ) : (
                <OrderTable data={orders?.data} handleAction={handleAction} />
            )}

            {orders?.meta?.total > 5 && (
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

            {/* Order Details Modal */}
            <OrderDetailsModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                order={currentOrder}
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

export default Order;
