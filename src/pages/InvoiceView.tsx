import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer } from "lucide-react";
import { format } from "date-fns";

const InvoiceView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [invoice, setInvoice] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [invoiceRes, itemsRes, companyRes] = await Promise.all([
        supabase.from("invoices").select("*").eq("id", id).single(),
        supabase.from("invoice_items").select("*").eq("invoice_id", id),
        supabase.from("company_profiles").select("*").eq("user_id", user!.id).single(),
      ]);
      if (invoiceRes.data) setInvoice(invoiceRes.data);
      if (itemsRes.data) setItems(itemsRes.data);
      if (companyRes.data) setCompany(companyRes.data);
      setLoading(false);
    };
    fetchData();
  }, [id, user]);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Učitavanje...</div>;
  if (!invoice) return <div className="p-8 text-center text-muted-foreground">Faktura nije pronađena</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <h1 className="text-2xl font-semibold">Faktura {invoice.invoice_number}</h1>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="w-4 h-4" /> Štampaj
        </Button>
      </div>

      <Card className="invoice-shadow">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-semibold">{company?.company_name || "Firma"}</h2>
              {company?.address && <p className="text-muted-foreground text-sm mt-1">{company.address}</p>}
              {company?.phone && <p className="text-muted-foreground text-sm">{company.phone}</p>}
              {company?.email && <p className="text-muted-foreground text-sm">{company.email}</p>}
              {company?.pib && <p className="text-muted-foreground text-sm">PIB: {company.pib}</p>}
              {company?.maticni_broj && <p className="text-muted-foreground text-sm">MB: {company.maticni_broj}</p>}
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold text-primary">FAKTURA</h3>
              <p className="text-muted-foreground text-sm mt-1">{invoice.invoice_number}</p>
              <p className="text-muted-foreground text-sm">Datum: {format(new Date(invoice.invoice_date), "dd.MM.yyyy")}</p>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">KUPAC</h4>
            <p className="font-medium">{invoice.customer_name}</p>
            {invoice.car_registration && <p className="text-sm text-muted-foreground">Reg. oznaka: {invoice.car_registration}</p>}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>R.br.</TableHead>
                <TableHead>Usluga</TableHead>
                <TableHead className="text-center">Količina</TableHead>
                <TableHead>Jedinica</TableHead>
                <TableHead className="text-right">Cena</TableHead>
                <TableHead className="text-right">Ukupno</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-center">{Number(item.quantity)}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right font-mono">{Number(item.price).toFixed(2)}</TableCell>
                  <TableCell className="text-right font-mono font-medium">{Number(item.total).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="border-t mt-4 pt-4 flex justify-end">
            <div className="text-right">
              <span className="text-muted-foreground mr-4">UKUPNO:</span>
              <span className="text-2xl font-semibold font-mono">{Number(invoice.total).toFixed(2)} RSD</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceView;
