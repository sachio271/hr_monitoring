import { Applicant } from "@/interface/psikotes/response";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (): ColumnDef<Applicant>[] => [
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
        accessorKey: "tujuan_tes",
        header: "Tujuan Tes",
    },
    {
        accessorKey: "leveling",
        header: "Leveling",
    },
    {
        accessorKey: "nama_vendor",
        header: "Vendor",
    }
]