import { CreateAplicantPsikotesMutation } from "@/api/psikotes/create";
import { GetPsikotesAll } from "@/api/psikotes/get";
import { CreatePsikotesAplicant } from "@/components/helper/createPsikotesAplicant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useQueryClient } from "react-query";
import { toast, Toaster } from "sonner";
import { DataTable } from "../mcu/data-table/table";
import { columns } from "./data-table/column";

export const IndexAdminPsikotes = () => {
  const [cookies] = useCookies(['refreshToken']);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [offset, setOffset] = useState(0);
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const create = CreateAplicantPsikotesMutation();

  const { data, isLoading } = GetPsikotesAll(cookies.refreshToken, debouncedSearchParam, '', offset.toString());
  const totalPages = data?.pagination.totalPages ?? 0;

  const fetchData = async () => {
    setLoading(true);
    console.log("fetching data...");
    await queryClient.invalidateQueries(["vendor-psikotes-all", cookies.refreshToken, debouncedSearchParam, '', offset.toString()]);
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

  const handleCreateCancel = () => {
    setIsCreateOpen(false);
  }

  const handleCreate = (ktp: string, nama: string, tanggal: string, waktu: string, vendor: string, tujuan: string, leveling: string) => {
    try {
      create.mutate([cookies.refreshToken, ktp, nama, tanggal, waktu, vendor, leveling, tujuan], {
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
              await queryClient.invalidateQueries(["vendor-psikotes-all"]);
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

  return (
    <div>
      <Toaster />
      <CreatePsikotesAplicant isOpen={isCreateOpen} onClose={handleCreateCancel} handleConfirm={handleCreate}/>
      <div className="container mx-auto py-10">
        <div className="flex justify-between my-3">
          <h1 className="text-2xl font-bold">Aplicant Psikotes</h1>
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
        </div>
        {isLoading || loading ? (
          <div className="flex justify-center items-center w-full min-h-screen">
            <Loader2 className="animate-spin"/>
          </div>
        ) : (
          <DataTable columns={columns()} data={data?.data ?? []} />
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

export default IndexAdminPsikotes;