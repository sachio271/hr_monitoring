import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { File } from "buffer";

export function UploadPdfDialog(
    {
        title, 
        description,  
        handleUpload, 
        id,
        isOpen,
        onClose
    } : 
    {
        title:string, 
        description:string,  
        handleUpload: (paymentId: string, fileName:File) => void, 
        id:string,
        isOpen: boolean;
        onClose: () => void;
    }
){
    const [fileName, setFileName] = useState<File | null>(null);
    const handleFileChange = (event:any) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0]); 
        } else {
            setFileName(null);
        }
    };
    return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
             {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              File
            </Label>
            <Input
              id="name"
              type="file"
              className="col-span-3"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() =>  {
            if (fileName) {
                handleUpload(id, fileName);
            }
            onClose(); 
            }}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}