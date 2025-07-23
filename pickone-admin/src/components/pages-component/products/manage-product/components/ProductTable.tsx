import React, {useState} from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {Switch} from "@/components/ui/switch";
import Link from "next/link";
import {
    useDeleteProductMutation,
    useTogglePublishMutation,
} from "@/redux/api/productApi";
import {useRouter} from "next/navigation";
import DeleteConfirmDialog from "@/components/pages-component/category/DeleteConfirmDialog";

const ProductTable = ({data}: {data: any[]}) => {
    const [togglePublish] = useTogglePublishMutation();
    const router = useRouter();
    const handlePublishedChange = async (id: string) => {
        await togglePublish(id).unwrap();
    };

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [deleteProduct, {isLoading}] = useDeleteProductMutation();

    const handleDeleteProduct = async (id: string) => {
        await deleteProduct(id).unwrap();
    };

    return (
        <Table className="text-base font-normal text-black capitalize">
            <TableHeader className="!bg-[#DFE3FA]">
                <TableRow className="border-none">
                    <TableHead className="rounded-l-lg py-4 pl-10">
                        Sl
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="rounded-r-lg py-4 pr-10">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((product: any, i: number) => (
                    <TableRow key={product?._id}>
                        <TableCell className="py-4 pl-10">{i + 1}</TableCell>
                        <TableCell>{product?.title}</TableCell>
                        <TableCell>{product?.code}</TableCell>
                        <TableCell className="text-nowrap">
                            {product?.price} BDT
                        </TableCell>
                        <TableCell className="text-nowrap">
                            {product?.quantity} pcs
                        </TableCell>
                        <TableCell>{product?.category?.title}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id={`publish-switch-${product._id}`}
                                    checked={product?.is_published || false}
                                    onCheckedChange={() =>
                                        handlePublishedChange(product?._id)
                                    }
                                />
                                <label
                                    htmlFor={`publish-switch-${product._id}`}
                                    className="text-sm">
                                    {product?.is_published
                                        ? "Published"
                                        : "Not Published"}
                                </label>
                            </div>
                        </TableCell>
                        <TableCell className="py-4 pr-10">
                            <div className="flex items-center">
                                <Link
                                    href={`/product/manage-product/view/?productId=${product?.id}`}
                                    className="btn bg-transparent hover:bg-transparent border border-primary text-primary  py-2 px-4 mr-3 inline-block text-sm">
                                    View
                                </Link>

                                <button
                                    onClick={() =>
                                        router.push(
                                            `/product/manage-product/edit-product?id=${product.id}`
                                        )
                                    }
                                    className="btn py-2 px-4 mr-3 inline-block text-sm">
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setIsDeleteDialogOpen(true);
                                    }}
                                    className="rounded  py-2 px-4 bg-[#D91313] hover:bg-[#D91313] text-white text-sm">
                                    Delete
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {isDeleteDialogOpen && (
                <DeleteConfirmDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onConfirm={() => handleDeleteProduct(selectedProduct?._id)}
                    isDeleting={isLoading}
                />
            )}
        </Table>
    );
};

export default ProductTable;
