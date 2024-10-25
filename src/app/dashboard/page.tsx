import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex flex-col justify-center text-center h-full max-w-5xl max-auto my-8">
      <h2 className="text-5xl">Dashboard</h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left">11/12/2023</TableCell>
            <TableCell className="text-left">James Smith</TableCell>
            <TableCell className="text-left">james@ymail.com</TableCell>
            <TableCell className="text-left">
              <Badge className="rounded">Open</Badge>
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
