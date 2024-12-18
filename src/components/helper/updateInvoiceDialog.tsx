import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function UpdateInvoiceDialog(
    {
        title, 
        description,  
        handleConfirm, 
        id,
        isOpen,
        inv,
        onClose
    } : 
    {
        title:string, 
        description:string,  
        handleConfirm: (paymentId: string, invoice: string) => void, 
        id:string,
        isOpen: boolean;
        inv: string;
        onClose: () => void;
    }
){
    const [invoice, setInvoice] = useState<string>('');
    useEffect(() => {
        setInvoice(inv);
    },[inv]);
    return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                {description}
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="invoice" className="text-right">
              Nomor Invoice
            </Label>
            <Input
              id="invoice"
              value={invoice}
              className="col-span-3"
              onChange={(e) => setInvoice(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
            <Button onClick={() =>  {handleConfirm(id, invoice); onClose();}}>Save</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
}