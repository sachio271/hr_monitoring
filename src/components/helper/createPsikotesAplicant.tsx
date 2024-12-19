import { GetJobDesc } from "@/api/jobdesc/get";
import { GetVendorsData } from "@/api/vendors/get";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { VendorSelect } from "./vendorSelect";

export function CreatePsikotesAplicant(
    {
        handleConfirm,
        isOpen,
        onClose
    } : 
    {
        handleConfirm: (ktp: string, nama: string, tanggal: string, waktu: string, vendor: string, tujuan: string, leveling: string, posisi: string) => void, 
        isOpen: boolean;
        onClose: () => void;
    }
){
    const [ktp, setKtp] = useState<string>('');
    const [nama, setNama] = useState<string>('');
    const [tanggal, setTanggal] = useState<string>('');
    const [waktu, setWaktu] = useState<string>('');
    const [vendor, setVendor] = useState<string>('');
    const [tujuan, setTujuan] = useState<string>('');
    const [leveling, setLeveling] = useState<string>('');
    const [, setPosisi] = useState<string>("");
    const [pos, setPos] = useState<string>("");
    const [selectedJobdesc, setSelectedJobdesc] = useState<string[]>([]);
    const resetFields = () => {
        setKtp('');
        setNama('');
        setTanggal('');
        setWaktu('');
        setVendor('');
        setTujuan('');
        setLeveling('');
        setPosisi('');
        setSelectedJobdesc([]);
        setPos('');
    };
    

    const [cookies] = useCookies(['refreshToken']);

    const { data: vendorData, isLoading: isLoadingVendor } = GetVendorsData(cookies.refreshToken, 'PSIKOTES');
    const { data: jobDescData, isLoading: isLoadingJobDesc } = GetJobDesc(cookies.refreshToken);

    const handlePosisiChange = (value: string) => {
        setPosisi(value);
        const selected = jobDescData?.data.find((job) => job.posisi === value);
        setSelectedJobdesc(selected ? selected.jobdesc : []);
        setPos(value);
    };

    return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-h-[80vh] overflow-y-auto">
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
                <Label htmlFor="tujuan" className="text-right">
                    Tujuan Tes
                </Label>
                <Select onValueChange={(value) => setTujuan(value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Tujuan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tujuan</SelectLabel>
                            <SelectItem value="SELEKSI">Seleksi</SelectItem>
                            <SelectItem value="PROMOSI">Promosi</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leveling" className="text-right">
                Leveling
                </Label>
                <Select onValueChange={(value) => setLeveling(value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Leveling" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Leveling</SelectLabel>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="B1">B1</SelectItem>
                            <SelectItem value="B2">B2</SelectItem>
                            <SelectItem value="B3">B3</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vendor" className="text-right">
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
                <Label htmlFor="posisi" className="text-right">
                    Posisi
                </Label>
                {isLoadingJobDesc ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <Select onValueChange={handlePosisiChange}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Posisi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Posisi</SelectLabel>
                                {jobDescData?.data.map((job) => (
                                    <SelectItem key={job.posisi} value={job.posisi}>
                                        {job.posisi}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </div>
            {selectedJobdesc.length > 0 && (
                <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right">Job Description</Label>
                    <div className="col-span-3 border rounded-md p-2 max-h-40 overflow-y-auto">
                        <ul className="col-span-3 list-disc pl-4">
                            {selectedJobdesc.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pos" className="text-right">
                    Posisi Aktual
                </Label>
                <Input
                    id="pos"
                    value={pos}
                    className="col-span-3"
                    onChange={(e) => setPos(e.target.value)}
                />
            </div>
        </div>
        <DialogFooter>
            <Button onClick={() =>  {handleConfirm(ktp, nama, tanggal, waktu, vendor, tujuan, leveling, pos); resetFields(); onClose();}}>Save</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
}