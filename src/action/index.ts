"use server";

import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createInvoice(formData: FormData) {
  const { userId } = await auth();

  if (!userId) return;

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const value = Math.floor(parseFloat(formData.get("value") as string));
  const description = formData.get("description") as string;

  const results = await db
    .insert(Invoices)
    .values({ value, description, userId, status: "open" })
    .returning({ id: Invoices.id });

  redirect(`/invoices/${results[0].id}`);
}

export async function updateInvoiceStatus(formData: FormData) {
  const { userId } = await auth();

  if (!userId) return;

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  revalidatePath(`/invoices/${id}`);
}
