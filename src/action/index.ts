"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createInvoice(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const value = Math.floor(parseFloat(formData.get("value") as string));
  const description = formData.get("description") as string;

  const results = await db
    .insert(Invoices)
    .values({ value, description, status: "open" })
    .returning({ id: Invoices.id });

  redirect(`/invoices/${results[0].id}`);
}
