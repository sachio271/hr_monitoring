import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export function ConfirmationDialog(
    {
        title, 
        description,  
        handleConfirm, 
        id,
        isOpen,
        onClose
    } : 
    {
        title:string, 
        description:string,  
        handleConfirm: (paymentId: string) => void, 
        id:string,
        isOpen: boolean;
        onClose: () => void;
    }
){
    return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
            {description}
        </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose onClick={onClose}>
                Cancel
            </DialogClose>
            <Button onClick={() =>  {handleConfirm(id); onClose();}}>Confirm</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
}