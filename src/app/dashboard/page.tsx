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
import Container from "@/components/ui/Container";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) return;

  const invoices = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.userId, userId));

  return (
    <main className="gap-6 my-12">
      <Container>
        <article className="flex justify-between mb-5">
          <h2 className="text-3xl font-semibold">Invoices</h2>
          <Button asChild>
            <Link href="invoices/new">Create</Link>
          </Button>
        </article>
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
                    <Badge
                      className={cn(
                        "rounded-full capitalize",
                        invoice.status === "open" && "bg-blue-500",
                        invoice.status === "paid" && "bg-green-500",
                        invoice.status === "void" && "bg-zinc-500",
                        invoice.status === "uncollectible" && "bg-red-500"
                      )}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${invoice.value.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
