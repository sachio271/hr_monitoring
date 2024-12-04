import { Button } from "@/components/ui/button";
import { McuApplicant } from "@/interface/mcu/response"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<McuApplicant>[] = [
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
                <DropdownMenuItem
                  
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]