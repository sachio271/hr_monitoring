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

export const Index = () => {
  const [cookies] = useCookies(['refreshToken']);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const acc = UpdateKonfirmasiMutation();

  // Use the GetMcuData function to fetch data
  const { data, isLoading } = GetMcuData(cookies.refreshToken, '', '', page.toString());

  const totalPages = data?.pagination.totalPages ?? 0;

  const fetchData = async (newPage: number) => {
    setLoading(true);
    await queryClient.invalidateQueries(["vendor-mcu-all", cookies.refreshToken, '', '', newPage.toString()]);
    setLoading(false);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchData(newPage);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      fetchData(newPage);
    }
  };

  const handleActionClick = (id: string) => {
    console.log("Action clicked with ID:", id);
    setSelectedId(id);
    setIsDialogOpen(true);
  };

  const handleConfirm=(id:string) =>{
    console.log("Confirm clicked with ID:", id);
    setIsDialogOpen(false);
    try {
      acc.mutate([cookies.refreshToken, selectedId, '1', '1'], {
          onError: (error) => {
            console.log('error : ' + error);
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

  return (
    <div>
      <Toaster />
      <ConfirmationDialog description="Apakah peserta ini sudah hadir?" title="Are you sure ?" handleConfirm={handleConfirm} id={selectedId} 
        isOpen={isDialogOpen}
        onClose={handleCancel}/>
      <div className="container mx-auto py-10">
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

export default Index;