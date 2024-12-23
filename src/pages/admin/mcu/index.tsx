import { CreateAplicantMcuMutation } from "@/api/mcu/create";
import { GetMcuData } from "@/api/mcu/get";
import { UpdateInvoiceMutation } from "@/api/mcu/update-invoice";
import { GetPenempatan } from "@/api/penempatan/get";
import { CreateMcuAplicant } from "@/components/helper/createMCUAplicant";
import { ComboboxDemo } from "@/components/helper/penempatanSelect";
import { UpdateInvoiceDialog } from "@/components/helper/updateInvoiceDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const acc = UpdateInvoiceMutation();
  const create = CreateAplicantMcuMutation();

  // Use the GetMcuData function to fetch data
  const { data, isLoading } = GetMcuData(cookies.refreshToken, debouncedSearchParam, penempatanValue, offset.toString());
  const { data: penempatanData, isLoading: isLoadingPenempatan } = GetPenempatan(cookies.refreshToken);

  const totalPages = data?.pagination.totalPages ?? 0;

  const fetchData = async () => {
    setLoading(true);
    console.log("fetching data...");
    await queryClient.invalidateQueries(["vendor-mcu-all", cookies.refreshToken, debouncedSearchParam, penempatanValue, offset.toString()]);
    setLoading(false);
  };

  const debouncedSetSearch = useRef(
    debounce((value) => setDebouncedSearchParam(value), 1000)
  ).current;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParam(value); // Immediate UI update
    setPage(1);
    setOffset(0);
    debouncedSetSearch(value); // Debounced API trigger
  };

  useEffect(() => {
    return () => debouncedSetSearch.cancel();
  }, []);

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

  const handleCreateCancel = () => {
    setIsCreateOpen(false);
  }

  const handleCreate = (ktp: string, nama: string, tanggal: string, waktu: string, vendor: string, penempatan: string) => {
    try {
      create.mutate([cookies.refreshToken, ktp, nama, tanggal, waktu, vendor, penempatan], {
        onError: (error:unknown) => {
          if (error instanceof AxiosError) {
            console.log("error : " + error.response?.data.message);
            toast("Penyimpanan Gagal", {
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
              toast("Aplicant Diterima!", {
                description: "Data Aplicant berhasil disimpan",
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
      <CreateMcuAplicant isOpen={isCreateOpen} onClose={handleCreateCancel} handleConfirm={handleCreate}/>
      <UpdateInvoiceDialog title="Invoice" description="Update Invoice" id={selectedId} isOpen={isOpened} onClose={handleCancel} handleConfirm={handleConfirm} inv={invoice}/>
      <div className="container mx-auto py-10">
        <div className="flex justify-between my-3">
          <h1 className="text-2xl font-bold">Aplicant Medical Checkup</h1>
          <Button onClick={() => {setIsCreateOpen(true)}}>Tambah Aplicant</Button>
        </div>
        <div className="flex justify-between my-3">
          {/* search */}
          <Input 
            placeholder="Search" 
            value={searchParam} 
            className="w-1/3"
            onChange={handleSearchChange} 
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