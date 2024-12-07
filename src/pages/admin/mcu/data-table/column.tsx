import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { McuAplicant } from "@/interface/mcu/response";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns = (
  handleCopyPaymentId: (paymentId: string, mode: string) => void
): ColumnDef<McuAplicant>[] => [
    {
      accessorKey: "id_applicant",
      header: "Id",
    },
    {
      accessorKey: "nama_lengkap",
      header: "Nama",
    },
    {
      accessorKey: "no_ktp",
      header: "EKTP",
    },
    {
      accessorKey: "tgl_tes",
      header: "Tanggal",
      cell: ({row}) => {
        const formattedDate = row.original.tgl_tes.split("T")[0];
        return <div>{formattedDate}</div>;
      }
    },
    {
        accessorKey: "waktu_tes",
        header: "Waktu",
    },
    {
        accessorKey: "nama_vendor",
        header: "Vendor",
    },
    {
      accessorKey: "status_konfirmasi",
      header: "Konfirmasi",
      cell: ({ row }) => {
        const status = row.original.status_konfirmasi;
        return (
          <Badge
            variant={status === "-1" ? "default" : status === "0" ? "destructive" : "secondary"}
            className={`capitalize ${status === "-1" ? "bg-gray-500": status === "0" ? "bg-red-600" : "bg-green-600"} text-white`}
          >
            {status === "-1" ? "pending" : status === "0" ? "rescheduled" : "accepted"}
          </Badge>
        );
      },
    },
    {
        accessorKey: "status_attendance",
        header: "Kehadiran",
        cell: ({ row }) => {
          const status = row.original.status_attendance;
          return (
            <Badge
              variant={status === -1 ? "default" : status === 0 ? "destructive" : "secondary"}
              className={`capitalize ${status === -1 ? "bg-gray-500": status === 0 ? "bg-red-600" : "bg-green-600"} text-white`}
            >
              {status === -1 ? "pending" : status === 0 ? "Tidak Hadir" : "Hadir"}
            </Badge>
          );
        },
    },
    {
      accessorKey: "mcu_file_link",
      header: "Hasil Tes",
      cell: ({ row }) => {
        const status = row.original.mcu_file_link;
        return (
          <Badge
            variant={status === "" ? "default" : "secondary"}
            className={`capitalize ${status === "" ? "bg-gray-500": "bg-green-600"} text-white`}
          >
            {status === "" ? "Belum Tersedia"  : "Tersedia"}
          </Badge>
        );
      },
    },
    {
        header: "actions",
        cell: ({ row }) => {
          const rows = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {rows.mcu_file_link !== "" && (
                    <DropdownMenuItem
                    onClick={() => handleCopyPaymentId(rows.id_applicant.toString(), 'hasil')}
                    >
                        <a href={rows.mcu_file_link ?? ""} download target="_blank">
                            Download Hasil Tes
                        </a>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => handleCopyPaymentId(rows.id_applicant.toString(), 'invoice')}
                >
                  Download Invoice
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]