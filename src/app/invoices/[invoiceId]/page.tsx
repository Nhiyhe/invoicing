import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/Container";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { STATUS } from "@/data/invoices";
import { updateInvoiceStatus } from "@/action";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice Id");
  }

  const { userId } = await auth();

  if (!userId) return;

  const [invoice] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!invoice) return notFound();

  return (
    <main className=" my-8">
      <Container className="flex justify-between">
        <div>
          <div className="flex items-center mb-5">
            <h2 className="text-3xl font-semibold mr-4">Invoice {invoiceId}</h2>
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
          </div>
          <p className="text-3xl mb-3">{(invoice.value * 100).toFixed(2)}</p>
          <div className="text-2xl mb-2">Billing Information</div>
          <p className="mb-2">{invoice.description}</p>
          <p className="mb-2">Invoice Id {invoice.id}</p>
          <p className="mb-2">
            Invoice Date {new Date(invoice.createDate).toLocaleDateString()}
          </p>
          <p className="mb-2">Billing Name {}</p>
          <p className="mb-2">Billing Email {}</p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Change Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {STATUS.map((status) => {
                return (
                  <DropdownMenuItem key={status.id}>
                    <form action={updateInvoiceStatus}>
                      <input type="hidden" name="id" value={invoiceId} />
                      <input type="hidden" name="status" value={status.id} />
                      <button>{status.label}</button>
                    </form>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </main>
  );
}
