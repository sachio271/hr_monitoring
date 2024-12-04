import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCookies } from "react-cookie";
import { GetMcuData } from "../../api/vendors/get";
import { useAuthStore } from "../../state/authState";

export const Index = () => {
  const [cookies,] = useCookies(['refreshToken']);
  const token = useAuthStore((state) => state.auth.token)
  console.log(cookies)
  const data = GetMcuData(cookies.refreshToken, '270990', '', '')
  data.isSuccess && console.log(data.data)
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data?.data.map((e, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{e.nama_lengkap}</TableCell>
            <TableCell>{e.no_ktp}</TableCell>
            <TableCell>{e.nama_vendor}</TableCell>
            <TableCell className="text-right">{e.recruiter}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default Index