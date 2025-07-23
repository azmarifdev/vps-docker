"use client";

import {useState} from "react";
import {
    useCategoryListQuery,
    useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
import {FaEdit, FaTrash, FaPlus} from "react-icons/fa";
import AddCategoryDialog from "./AddCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import {Button} from "@/components/ui/button";
import Loader from "@/components/reusable/Loader/Loader";

interface Category {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

const CategoryList = () => {
    const {data: categoryData, isLoading} = useCategoryListQuery();
    const [deleteCategory, {isLoading: isDeleting}] =
        useDeleteCategoryMutation();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedCategory) {
            try {
                await deleteCategory(selectedCategory.id).unwrap();
                setIsDeleteDialogOpen(false);
            } catch (error) {
                console.error("Failed to delete the category", error);
            }
        }
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsEditDialogOpen(true);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="flex items-center gap-2">
                    <FaPlus size={14} />
                    Add Category
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData?.data?.map((category: Category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-lg shadow border border-gray-100 p-6 capitalize ">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">
                                {category.title}
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors">
                                    <FaEdit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(category)}
                                    className="text-red-500 hover:text-red-700 transition-colors">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Category Dialog */}
            <AddCategoryDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
            />

            {/* Edit Category Dialog */}
            {selectedCategory && (
                <EditCategoryDialog
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    category={selectedCategory}
                />
            )}

            {/* Delete Confirmation Dialog */}
            {selectedCategory && (
                <DeleteConfirmDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onConfirm={handleConfirmDelete}
                    isDeleting={isDeleting}
                />
            )}
        </div>
    );
};

export default CategoryList;
