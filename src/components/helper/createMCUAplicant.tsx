import { GetPenempatan } from "@/api/penempatan/get";
import { GetVendorsData } from "@/api/vendors/get";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ComboboxDemo } from "./penempatanSelect";
import { VendorSelect } from "./vendorSelect";

export function CreateMcuAplicant(
    {
        handleConfirm,
        isOpen,
        onClose
    } : 
    {
        handleConfirm: (ktp: string, nama: string, tanggal: string, waktu: string, vendor: string, penempatan: string) => void, 
        isOpen: boolean;
        onClose: () => void;
    }
){
    const [ktp, setKtp] = useState<string>('');
    const [nama, setNama] = useState<string>('');
    const [tanggal, setTanggal] = useState<string>('');
    const [waktu, setWaktu] = useState<string>('');
    const [vendor, setVendor] = useState<string>('');
    const [penempatan, setPenempatan] = useState<string>('');

    const [cookies] = useCookies(['refreshToken']);

    const { data: penempatanData, isLoading: isLoadingPenempatan } = GetPenempatan(cookies.refreshToken);
    const { data: vendorData, isLoading: isLoadingVendor } = GetVendorsData(cookies.refreshToken, 'POLIKLINIK');

    return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Create New Aplicant</DialogTitle>
            <DialogDescription>
                Silahkan masukan data aplicant yang akan didaftarkan
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ktp" className="text-right">
              Nomor KTP
            </Label>
            <Input
              id="ktp"
              value={ktp}
              className="col-span-3"
              onChange={(e) => setKtp(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama" className="text-right">
              Nama Lengkap
            </Label>
            <Input
              id="nama"
              value={nama}
              className="col-span-3"
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tanggal" className="text-right">
              Tanggal Tes
            </Label>
            <Input
              id="tanggal"
              type="date"
              value={tanggal}
              className="col-span-3"
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="waktu" className="text-right">
              Waktu Tes
            </Label>
            <Input
              id="waktu"
              type="time"
              value={waktu}
              className="col-span-3"
              onChange={(e) => setWaktu(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ktp" className="text-right">
              Vendor
            </Label>
            {isLoadingVendor ? (
            <div className="flex justify-center items-center w-full min-h-screen">
              <Loader2 className="animate-spin"/>
            </div>
            ) : (
                <>
                <VendorSelect
                    data={vendorData?.data ?? []}
                    value={vendor}
                    setValue={setVendor}
                />
                </>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ktp" className="text-right">
              Penempatan
            </Label>
            {isLoadingPenempatan ? (
            <div className="flex justify-center items-center w-full min-h-screen">
              <Loader2 className="animate-spin"/>
            </div>
            ) : (
                <>
                <ComboboxDemo
                    data={penempatanData?.data ?? []}
                    value={penempatan}
                    setValue={setPenempatan}
                />
                </>
            )}
          </div>
        </div>
        <DialogFooter>
            <Button onClick={() =>  {handleConfirm(ktp, nama, tanggal, waktu, vendor, penempatan); onClose();}}>Save</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
}