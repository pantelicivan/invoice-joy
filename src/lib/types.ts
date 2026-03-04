import { Database } from "../integrations/supabase/types";

export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type InvoiceItem = Database["public"]["Tables"]["invoice_items"]["Row"];
export type CompanyProfile =
  Database["public"]["Tables"]["company_profiles"]["Row"];
