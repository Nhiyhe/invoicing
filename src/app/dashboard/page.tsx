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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/db";
import { Invoices } from "@/db/schema";

export default async function Home() {
  const invoices = await db.select().from(Invoices);
  return (
    <main className="flex flex-col text-center justify-center h-full max-w-5xl max-auto my-8">
      <div className="flex justify-between mb-5">
        <h2 className="text-3xl font-semibold">Invoices</h2>
        <Button asChild>
          <Link href="invoices/new">Create</Link>
        </Button>
      </div>
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
          {invoices.map((invoice) => {
            return (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium text-left">
                  <Link href={`/invoices/${invoice.id}`}>
                    <span className="font-semibold">
                      {new Date(invoice.createDate).toLocaleDateString()}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="text-left">James Smith</TableCell>
                <TableCell className="text-left">james@ymail.com</TableCell>
                <TableCell className="text-left">
                  <Badge className="rounded">{invoice.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${invoice.value.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
