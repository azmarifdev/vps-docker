"use client";

import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
}

const DeleteConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    isDeleting = false,
}: DeleteConfirmDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg">
                <div className="py-4">
                    <p className="text-center text-gray-700">
                        Are you sure you want to delete that?
                    </p>
                </div>

                <div className="flex justify-center items-center gap-2">
                    <Button
                        type="button"
                        className="!border-red-500"
                        variant="outline"
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Confirm"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
