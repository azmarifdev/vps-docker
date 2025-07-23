import React from "react";

import {Button} from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmationModalProps {
    dialogOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    setDialogOpen: (open: boolean) => void;
    dialogAction: {
        title: string;
        description: string;
        type?: "delete" | "default";
    } | null;
    handleConfirmAction: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    dialogOpen,
    setDialogOpen,
    dialogAction,
    handleConfirmAction,
}) => {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {dialogAction?.title}
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-500">
                        {dialogAction?.description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        className="!text-red-500 !border-red-500 "
                        onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmAction}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
