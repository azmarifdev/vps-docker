/* eslint-disable no-unused-vars */
// components/order/OrderTable.tsx
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

interface OrderTableProps {
    data: any[];
    handleAction: (
        type: "approve" | "complete" | "cancel" | "delete" | "view",
        order: any
    ) => void;
}

const OrderTable = ({data, handleAction}: OrderTableProps) => {
    // Render status badge with appropriate color
    const renderStatusBadge = (status: string) => {
        let customClass = "";

        switch (status) {
            case "pending":
                customClass =
                    "bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-100 ";
                break;
            case "processing":
                customClass =
                    "bg-yellow-50 text-yellow-600 border-yellow-300 hover:bg-yellow-100";
                break;
            case "completed":
                customClass =
                    "bg-green-50 text-green-600 border-green-300 hover:bg-green-100";
                break;
            case "cancelled":
            case "returned":
                customClass =
                    "bg-red-50 text-red-600 border-red-300 hover:bg-red-100";
                break;
            case "completed":
                customClass =
                    "bg-green-50 text-green-600 border-green-300 hover:bg-green-100";
                break;
        }

        return <Badge className={`${customClass} px-2 py-1`}>{status}</Badge>;
    };

    return (
        <Table className="text-base font-normal text-black capitalize">
            <TableHeader className="!bg-[#DFE3FA]">
                <TableRow className="border-none">
                    <TableHead className="rounded-l-lg py-4 pl-10">
                        SI
                    </TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="rounded-r-lg py-4 pr-10">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((order: any, index: number) => (
                    <TableRow key={order?._id}>
                        <TableCell className="py-4 pl-10">
                            {index + 1}
                        </TableCell>
                        <TableCell>{order?.orderNo}</TableCell>
                        <TableCell>
                            <div>
                                <div className="font-medium">
                                    {order?.address?.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {order?.address?.phone}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            {order?.createdAt &&
                                format(
                                    new Date(order.createdAt),
                                    "MMM dd, yyyy"
                                )}
                        </TableCell>
                        <TableCell className="text-nowrap">
                            {order?.total_price?.toFixed(2)}
                        </TableCell>
                        <TableCell>
                            {renderStatusBadge(order?.status)}
                        </TableCell>
                        <TableCell className="py-4 pr-10">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-500 !text-blue-500 font-semibold"
                                    onClick={() => handleAction("view", order)}>
                                    View
                                </Button>
                                {/* {order?.status === "pending" && (
                                    <Button
                                        size="sm"
                                        className="font-semibold"
                                        onClick={() =>
                                            handleAction("approve", order)
                                        }>
                                        Approve
                                    </Button>
                                )}
                                {order?.status === "processing" && (
                                    <Button
                                        size="sm"
                                        className="font-semibold bg-green-500 text-white hover:bg-green-500"
                                        onClick={() =>
                                            handleAction("complete", order)
                                        }>
                                        Complete
                                    </Button>
                                )}
                                {(order?.status === "pending" ||
                                    order?.status === "processing") && (
                                    <Button
                                        size="sm"
                                        variant={"outline"}
                                        className="border-red-500 !text-red-500 font-semibold"
                                        onClick={() =>
                                            handleAction("cancel", order)
                                        }>
                                        Cancel
                                    </Button>
                                )} */}
                                <Button
                                    size="sm"
                                    className="bg-red-500 hover:bg-red-500 text-white font-semibold"
                                    onClick={() =>
                                        handleAction("delete", order)
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

export default OrderTable;
