import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface ConfirmationModalProps {
    dialogOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    setDialogOpen: (open: boolean) => void;
    dialogAction: {
        title: string;
        description: string;
        type: "delete" | "default";
    };
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
                    <DialogTitle>{dialogAction.title}</DialogTitle>
                    <DialogDescription>
                        {dialogAction.description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="outline"
                        className="!text-red-500 !border-red-500 "
                        onClick={handleConfirmAction}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
