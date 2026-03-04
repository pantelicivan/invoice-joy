ALTER TABLE public.company_profiles ADD COLUMN IF NOT EXISTS bank TEXT;
ALTER TABLE public.company_profiles ADD COLUMN IF NOT EXISTS iban TEXT;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS customer_address TEXT DEFAULT '';