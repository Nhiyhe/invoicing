import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export default async function InvoicePageNew() {
  const results = await db.execute(sql`SELECT current_database()`);
  return (
    <main className="flex flex-col justify-center h-full max-w-5xl max-auto my-8">
      <div className="flex justify-between mb-5">
        <h2 className="text-3xl">Create New Invoice</h2>
        {JSON.stringify(results)}
      </div>
      <form className="grid gap-2 max-w-sm">
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
    </main>
  );
}
