import { GetMcuData } from "@/api/vendors/get";
import { UpdateKonfirmasiMutation } from "@/api/vendors/update-status";
import { ConfirmationDialog } from "@/components/helper/confirmationDialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useQueryClient } from "react-query";
import { toast, Toaster } from "sonner";
import { columns } from "./data-table/column";
import { DataTable } from "./data-table/table";
import { Input } from "@/components/ui/input";
import { UploadHasilMcuMutation } from "@/api/vendors/upload-pdf";
import { UploadPdfDialog } from "@/components/helper/uploadPdf";
import { File } from "buffer";
import { AxiosError } from "axios";
import { GetPenempatan } from "@/api/penempatan/get";
import { ComboboxDemo } from "@/components/helper/penempatanSelect";

export const Index = () => {
  const [cookies] = useCookies(['refreshToken']);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogPdfOpen, setIsDialogPdfOpen] = useState(false);
  const [penempatanValue, setPenempatanValue] = useState("");
  const [searchParam, setSearchParam] = useState('');
  const acc = UpdateKonfirmasiMutation();
  const postUpload = UploadHasilMcuMutation();

  // Use the GetMcuData function to fetch data
  const { data, isLoading } = GetMcuData(cookies.refreshToken, searchParam, penempatanValue, page.toString());
  const { data: penempatanData, isLoading: isLoadingPenempatan } = GetPenempatan(cookies.refreshToken);

  const totalPages = data?.pagination.totalPages ?? 0;

  const fetchData = async (newPage: number) => {
    setLoading(true);
    await queryClient.invalidateQueries(["vendor-mcu-all", cookies.refreshToken, searchParam, penempatanValue,, (newPage - 1).toString()]);
    setLoading(false);
  };

  const handlePreviousPage = () => {
    if (page >= 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchData(newPage);
    }
  };

  const handleNextPage = () => {
    if (page + 1 < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      fetchData(newPage);
    }
  };

  const handleActionClick = (id: string, mode:string) => {
    console.log("Action clicked with ID:", id);
    setSelectedId(id);
    if (mode === 'hasil') {
      setIsDialogPdfOpen(true);
    } else if (mode === 'konfirm') {
      setIsDialogOpen(true);
    }
  };

  const handleConfirm=(id:string) =>{
    console.log("Confirm clicked with ID:", id);
    setIsDialogOpen(false);
    try {
      acc.mutate([cookies.refreshToken, selectedId, '1', '1'], {
        onError: (error:unknown) => {
          if (error instanceof AxiosError) {
            console.log("error : " + error.response?.data.message);
            toast("Konfirmasi Gagal", {
              description: error.response?.data.message,
              style: {
                backgroundColor: "#10B981",
                color: "#F3F4F6",
              },
            });
          }
        },
          onSuccess: async () => {
              await queryClient.invalidateQueries(["vendor-mcu-all"]);
              toast("Konfirmasi Diterima!", {
                description: "Peserta dinyatakan sudah hadir",
                style: {
                  backgroundColor: "#10B981",
                  color: "#F3F4F6",
                },
              });
          }
      });
    } catch (error) {
        console.log('error : ' + error);
    }
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleCancelPdf = () => {
    setIsDialogPdfOpen(false);
  };

  const handleUpload = (id: string, fileName:File) => {
    try {
        postUpload.mutate([cookies.refreshToken, fileName, '5', '174', '1'], {
            onError: (error:unknown) => {
              if (error instanceof AxiosError) {
                console.log("error : " + error.response?.data.message);
                toast("Upload Gagal", {
                  description: error.response?.data.message,
                  style: {
                    backgroundColor: "#a70000 ",
                    color: "#F3F4F6",
                  },
                });
              }
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["vendor-mcu-all"]);
                toast("Upload Berhasil!", {
                    description: "Berkas berhasil diunggah",
                    style: {
                        backgroundColor: "#10B981",
                        color: "#F3F4F6",
                    },
                });
            }
        });
    } catch (error) {
      console.log('error : ' + error);
    }
  }

  return (
    <div>
      <Toaster />
      <ConfirmationDialog description="Apakah peserta ini sudah hadir?" title="Are you sure ?" handleConfirm={handleConfirm} id={selectedId} 
        isOpen={isDialogOpen}
        onClose={handleCancel}/>
      <UploadPdfDialog description="Upload hasil MCU" title="Upload File" handleUpload={handleUpload} id={selectedId} isOpen={isDialogPdfOpen} onClose={handleCancelPdf}/>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">Vendor MCU</h1>
        <div className="flex justify-between my-3">
          {/* search */}
          <Input 
            placeholder="Search" 
            value={searchParam} 
            className="w-1/3"
            onChange={(e) => {
              setSearchParam(e.target.value);
              setPage(0);
              fetchData(0);
            }} 
          />
          {isLoadingPenempatan ? (
            <div className="flex justify-center items-center w-full min-h-screen">
              <Loader2 className="animate-spin"/>
            </div>
          ) : (
            <>
              <ComboboxDemo
                data={penempatanData?.data ?? []}
                value={penempatanValue}
                setValue={setPenempatanValue}
              />
            </>
          )}
        </div>
        {isLoading || loading ? (
          <div className="flex justify-center items-center w-full min-h-screen">
            <Loader2 className="animate-spin"/>
          </div>
        ) : (
          <DataTable columns={columns(handleActionClick)} data={data?.data ?? []} />
        )}
        <div className="flex items-center justify-between py-2 mt-3">
          <div>
            Page {page + 1} of {totalPages}
          </div>
          <div className="flex items-center justify-end space-x-2 py-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={page+1 === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;