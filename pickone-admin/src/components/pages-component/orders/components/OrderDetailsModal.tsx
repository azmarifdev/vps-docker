"use client";

import type React from "react";
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
import {
    FiPackage,
    FiMapPin,
    FiUser,
    FiPhone,
    FiDollarSign,
    FiShoppingCart,
    FiTag,
    FiShoppingBag,
    FiBox,
    FiInfo,
} from "react-icons/fi";
import Image from "next/image";

interface Product {
    _id: string;
    title: string;
    slug: string;
    code: string;
    thumbnail: string;
    price: number;
    discount: number;
    attribute?: {
        title: string;
        values: string;
    }[];
}

interface OrderItem {
    _id: string;
    product: Product;
    quantity: number;
    attribute?: {
        title: string;
        value: string;
    }[];
    price: number;
    discount_price: number;
    selling_price: number;
    subtotal: number;
}

interface Address {
    _id: string;
    orderId: string;
    name: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

interface Order {
    _id: string;
    orderNo: string;
    delivery_charge: number;
    subtotal: number;
    total_price: number;
    status: string;
    order_items: OrderItem[];
    createdAt: string;
    updatedAt: string;

    address: Address;
}

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
    isOpen,
    onClose,
    order,
}) => {
    if (!order) return null;

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "PPPp");
        } catch (error) {
            return dateString;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-blue-50 text-blue-600 border-blue-300";
            case "processing":
                return "bg-yellow-50 text-yellow-600 border-yellow-300";
            case "completed":
            case "delivered":
                return "bg-green-50 text-green-600 border-green-300";
            case "cancelled":
                return "bg-red-50 text-red-600 border-red-300";
            case "shipped":
                return "bg-purple-50 text-purple-600 border-purple-300";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <FiPackage className="h-5 w-5" />
                        Order Details
                        <Badge
                            variant="outline"
                            className={`ml-2 ${getStatusColor(order?.status)}`}>
                            {order?.status?.charAt(0)?.toUpperCase() +
                                order?.status?.slice(1)}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Order Information */}
                    <div className="space-y-4">
                        <div className="font-medium flex items-center gap-2">
                            <FiShoppingCart className="h-4 w-4" />
                            Order Information
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">
                                Order ID:
                            </div>
                            <div className="font-mono text-sm">
                                {order?.orderNo}
                            </div>

                            <div className="text-muted-foreground">
                                Date Placed:
                            </div>
                            <div>{formatDate(order?.createdAt)}</div>

                            <div className="text-muted-foreground">
                                Last Updated:
                            </div>
                            <div>{formatDate(order?.updatedAt)}</div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-4">
                        <div className="font-medium flex items-center gap-2">
                            <FiUser className="h-4 w-4" />
                            Customer Information
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Name:</div>
                            <div>{order?.address?.name}</div>

                            <div className="text-muted-foreground">Phone:</div>
                            <div className="flex items-center gap-1">
                                <FiPhone className="h-3 w-3" />
                                {order?.address?.phone}
                            </div>

                            <div className="text-muted-foreground">
                                Address:
                            </div>
                            <div className="flex items-center gap-1">
                                <FiMapPin className="h-3 w-3" />
                                {order?.address?.address}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="py-4">
                    <div className="font-medium mb-4 flex items-center gap-2">
                        <FiShoppingBag className="h-4 w-4" />
                        Order Items ({order?.order_items?.length})
                    </div>
                    <div className="space-y-4">
                        {order?.order_items?.map((item) => {
                            return (
                                <div
                                    key={item?._id}
                                    className="grid md:grid-cols-2 gap-4 p-4 rounded-md border">
                                    <div className="flex gap-4 w-full">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border">
                                            <Image
                                                src={
                                                    item?.product?.thumbnail ||
                                                    "/placeholder.svg"
                                                }
                                                alt={item?.product?.title}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {item?.product?.title}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Code: {item?.product?.code}
                                            </div>

                                            {/* Product Attribute */}
                                            {item?.attribute && (
                                                <div className="mt-1">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs inline-flex items-center gap-1">
                                                        {item?.attribute?.map(
                                                            (attr) => (
                                                                <div
                                                                    key={
                                                                        attr?.title
                                                                    }>
                                                                    {
                                                                        attr?.title
                                                                    }
                                                                    :{" "}
                                                                    {
                                                                        attr?.value
                                                                    }
                                                                </div>
                                                            )
                                                        )}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="w-full md:w-auto">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="grid grid-cols-3 gap-2 text-sm">
                                                {/* Header */}
                                                <div className="col-span-3 pb-1 mb-1 border-b text-muted-foreground text-xs font-medium flex items-center gap-1">
                                                    <FiInfo className="h-3 w-3" />
                                                    Price Breakdown
                                                </div>

                                                {/* Quantity */}
                                                <div className="text-muted-foreground">
                                                    Quantity:
                                                </div>
                                                <div className="col-span-2 font-medium text-right">
                                                    {item?.quantity}
                                                </div>

                                                {/* Unit Price */}
                                                <div className="text-muted-foreground">
                                                    Unit Price:
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    {formatCurrency(
                                                        item?.price
                                                    )}
                                                </div>

                                                <div className="text-muted-foreground">
                                                    Selling Price:
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    {formatCurrency(
                                                        item?.selling_price
                                                    )}
                                                </div>

                                                {/* Discount */}
                                                {item?.discount_price > 0 && (
                                                    <>
                                                        <div className="text-muted-foreground flex items-center gap-1">
                                                            Discount:
                                                        </div>
                                                        <div className="col-span-2 text-green-600 text-right">
                                                            -
                                                            {formatCurrency(
                                                                item?.discount_price
                                                            )}
                                                        </div>
                                                    </>
                                                )}

                                                {/* Subtotal */}
                                                <div className="pt-1 border-t text-muted-foreground">
                                                    Subtotal:
                                                </div>
                                                <div className="col-span-2 pt-1 border-t font-medium text-right">
                                                    {formatCurrency(
                                                        item?.subtotal
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="py-4 border-t">
                    <div className="font-medium mb-4 flex items-center gap-2">
                        <FiDollarSign className="h-4 w-4" />
                        Order Summary
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <FiBox className="h-3 w-3" />
                                Items Subtotal:
                            </span>
                            <span>{formatCurrency(order?.subtotal)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <FiPackage className="h-3 w-3" />
                                Delivery Charge:
                            </span>
                            <span>
                                {formatCurrency(order?.delivery_charge)}
                            </span>
                        </div>

                        {order?.order_items?.some(
                            (item) => item?.discount_price > 0
                        ) && (
                            <div className="flex justify-between text-green-600">
                                <span className="flex items-center gap-1">
                                    <FiTag className="h-3 w-3" />
                                    Total Discounts:
                                </span>
                                <span>
                                    -
                                    {formatCurrency(
                                        order?.order_items?.reduce(
                                            (total, item) =>
                                                total +
                                                (item?.price -
                                                    item?.selling_price) *
                                                    item?.quantity,
                                            0
                                        )
                                    )}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between font-medium text-lg pt-2 border-t">
                            <span>Grand Total:</span>
                            <span>{formatCurrency(order?.total_price)}</span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-red-500 text-red-600 hover:text-red-700 hover:bg-red-50">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsModal;
