import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const invoiceId = parseInt((await params).invoiceId);
  const [invoice] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  return (
    <main className="flex flex-col justify-center h-full max-w-5xl max-auto my-8">
      <div className="flex items-center  mb-5">
        <h2 className="text-3xl font-semibold mr-4">Invoice {invoiceId}</h2>
        <Badge
          className={cn(
            "rounded-full",
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
    </main>
  );
}
