import { GetMcuData } from "@/api/vendors/get";
import { useCookies } from "react-cookie";
import { DataTable } from "./data-table/table";
import { columns } from "./data-table/column";
import { Button } from "@/components/ui/button";

export const Index = () => {
  const [cookies,] = useCookies(['refreshToken']);
  console.log(cookies)
  const data = GetMcuData(cookies.refreshToken, '270990', '', '')
  data.isSuccess && console.log(data.data)
  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data.data?.data ?? []} />
        <div className="flex items-center justify-end space-x-2 py-2 mt-3">
        <Button
          variant="outline"
          size="sm"
          // onClick={() => table.previousPage()}
          // disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          // onClick={() => table.nextPage()}
          // disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      </div>
    </div>
  )
}

export default Index