import { createInvoice } from "@/action";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function InvoicePageNew() {
  return (
    <main className="max-auto my-8">
      <Container>
        <div className="flex justify-between mb-5">
          <h2 className="text-3xl">Create New Invoice</h2>
        </div>
        <form action={createInvoice} className="grid gap-2 max-w-sm">
          <div>
            <Label htmlFor="name" className="block font-semibold mb-2 text-sm">
              Billing Name
            </Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="block font-semibold mb-2 text-sm">
              Billing Email
            </Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div>
            <Label htmlFor="value" className="block font-semibold mb-2 text-sm">
              Value
            </Label>
            <Input id="value" name="value" type="text" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block font-semibold mb-2 text-sm"
            >
              Description
            </Label>
            <Textarea id="description" name="description"></Textarea>
          </div>
          <div>
            <Button className="w-full mt-4 font-semibold">Submit</Button>
          </div>
        </form>
      </Container>
    </main>
  );
}
