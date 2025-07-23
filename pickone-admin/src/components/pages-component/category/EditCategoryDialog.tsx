"use client";

import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUpdateCategoryMutation} from "@/redux/api/categoryApi";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import FormInput from "@/components/reusable/form/FormInputHF";
import toast from "react-hot-toast";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
});

interface Category {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

interface EditCategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category;
}

const EditCategoryDialog = ({
    isOpen,
    onClose,
    category,
}: EditCategoryDialogProps) => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
        },
    });

    const [updateCategory, {isLoading}] = useUpdateCategoryMutation();

    // Set initial form values when category changes
    useEffect(() => {
        if (category) {
            form.reset({
                title: category.title,
            });
        }
    }, [category, form]);

    const onSubmit = async (data: {title: string}) => {
        try {
            await updateCategory({
                id: category.id,
                data: {
                    title: data.title.trim(),
                },
            }).unwrap();

            onClose();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update category");
            console.log(error?.data?.message || "Failed to update category");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 py-2">
                        <FormInput
                            name="title"
                            label="Category Title"
                            type="text"
                            required
                            placeholder="Enter category title"
                        />

                        <div className="flex justify-center items-center gap-2 mt-2">
                            <Button
                                type="button"
                                className="w-40"
                                variant="outline"
                                onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                className="w-40"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? "Updating..." : "Update Category"}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default EditCategoryDialog;
