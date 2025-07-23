"use client";

import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAddCategoryMutation} from "@/redux/api/categoryApi";
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

interface AddCategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddCategoryDialog = ({isOpen, onClose}: AddCategoryDialogProps) => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
        },
    });

    const [addCategory, {isLoading}] = useAddCategoryMutation();

    const onSubmit = async (data: {title: string}) => {
        try {
            await addCategory(data).unwrap();
            form.reset();
            toast.success("Category added successfully");
            onClose();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add category");
            console.log(error?.data?.message || "Failed to add category");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
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
                                onClick={() => {
                                    form.reset();
                                    onClose();
                                }}>
                                Cancel
                            </Button>
                            <Button
                                className="w-40"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? "Adding..." : "Add Category"}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryDialog;
