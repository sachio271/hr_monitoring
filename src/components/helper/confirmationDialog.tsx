import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export function ConfirmationDialog(
    {
        title, 
        description,  
        handleConfirm, 
        handleReject, 
        id,
        isOpen,
        onClose
    } : 
    {
        title:string, 
        description:string,  
        handleConfirm: (paymentId: string) => void, 
        handleReject: (paymentId: string) => void, 
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
            <Button onClick={() =>  {handleReject(id); onClose();}}>Tidak Hadir</Button>
            <Button onClick={() =>  {handleConfirm(id); onClose();}}>Hadir</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
}