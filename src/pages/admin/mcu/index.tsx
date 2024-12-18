import { GetPenempatan } from "@/api/penempatan/get";
import { GetMcuData } from "@/api/vendors/get";
import { UpdateInvoiceMutation } from "@/api/vendors/update-invoice";
import { ComboboxDemo } from "@/components/helper/penempatanSelect";
import { UpdateInvoiceDialog } from "@/components/helper/updateInvoiceDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useQueryClient } from "react-query";
import { toast, Toaster } from "sonner";
import { columns } from "./data-table/column";
import { DataTable } from "./data-table/table";

export const IndexAdminMcu = () => {
  const [cookies] = useCookies(['refreshToken']);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [penempatanValue, setPenempatanValue] = useState("");
  const [searchParam, setSearchParam] = useState('');
  const [offset, setOffset] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [invoice, setInvoice] = useState('');

  const acc = UpdateInvoiceMutation();

  // Use the GetMcuData function to fetch data
  const { data, isLoading } = GetMcuData(cookies.refreshToken, searchParam, penempatanValue, offset.toString());
  const { data: penempatanData, isLoading: isLoadingPenempatan } = GetPenempatan(cookies.refreshToken);

  const totalPages = data?.pagination.totalPages ?? 0;

  const fetchData = async () => {
    setLoading(true);
    await queryClient.invalidateQueries(["vendor-mcu-all", cookies.refreshToken, searchParam, penempatanValue, offset.toString()]);
    setLoading(false);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setOffset(offset - 10);
      setPage(newPage);
      fetchData();
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setOffset(offset + 10);
      setPage(newPage);
      fetchData();
    }
  };

  const handleActionClick = (id: string, invoice: string) => {
    console.log("Action clicked with ID:", id);
    console.log("Invoice clicked with ID:", invoice);
    setSelectedId(id);
    if(invoice !== null){
      setInvoice(invoice);
    }
    setIsOpened(true);
  };

  const handleCancel = () => {
    setIsOpened(false);
  };

  const handleConfirm = (id:string, invoice:string) =>{
    console.log("Confirm clicked with ID:", id);
    try {
      acc.mutate([cookies.refreshToken, selectedId, '1', invoice], {
        onError: (error:unknown) => {
          if (error instanceof AxiosError) {
            console.log("error : " + error.response?.data.message);
            toast("Konfirmasi Gagal", {
              description: error.response?.data.message,
              style: {
                backgroundColor: "#a70000 ",
                color: "#F3F4F6",
              },
            });
          }
        },
          onSuccess: async () => {
              await queryClient.invalidateQueries(["vendor-mcu-all"]);
              toast("Konfirmasi Diterima!", {
                description: "Nomor Invoice berhasil diupdate",
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
      <UpdateInvoiceDialog title="Invoice" description="Update Invoice" id={selectedId} isOpen={isOpened} onClose={handleCancel} handleConfirm={handleConfirm} inv={invoice}/>
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
              setPage(1);
              setOffset(0);
              fetchData();
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
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center justify-end space-x-2 py-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexAdminMcu;