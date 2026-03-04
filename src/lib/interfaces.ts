export interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export interface InvoiceItem {
  service_id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  total: number;
}

export interface CompanyProfile {
  company_name: string;
  address: string;
  phone: string;
  email: string;
  bank: string;
  iban: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_address: string;
  car_registration: string;
  invoice_date: string;
  total: number;
  created_at: string;
}
