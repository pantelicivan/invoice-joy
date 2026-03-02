import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer } from "lucide-react";
import { format } from "date-fns";
import jakiLogo from "@/assets/jaki-logo.jpg";

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
        supabase
          .from("company_profiles")
          .select("*")
          .eq("user_id", user!.id)
          .single(),
      ]);
      if (invoiceRes.data) setInvoice(invoiceRes.data);
      if (itemsRes.data) setItems(itemsRes.data);
      if (companyRes.data) setCompany(companyRes.data);
      setLoading(false);
    };
    fetchData();
  }, [id, user]);

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">Laden...</div>
    );
  if (!invoice)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Rechnung nicht gefunden
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <h1 className="text-2xl font-semibold">
          Rechnung {invoice.invoice_number}
        </h1>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="w-4 h-4" /> Drucken
        </Button>
      </div>

      <Card className="invoice-shadow">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start gap-4">
              <img
                src={jakiLogo}
                alt="Jaki Reifenservice"
                className="h-16 rounded"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {company?.company_name || "Jaki Reifenservice"}
                </h2>
                {company?.address && (
                  <p className="text-muted-foreground text-sm mt-1">
                    {company.address}
                  </p>
                )}
                {company?.phone && (
                  <p className="text-muted-foreground text-sm">
                    {company.phone}
                  </p>
                )}
                {company?.email && (
                  <p className="text-muted-foreground text-sm">
                    {company.email}
                  </p>
                )}
                {company?.bank && (
                  <p className="text-muted-foreground text-sm">
                    Bank: {company.bank}
                  </p>
                )}
                {company?.iban && (
                  <p className="text-muted-foreground text-sm">
                    IBAN: {company.iban}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold text-primary">RECHNUNG</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {invoice.invoice_number}
              </p>
              <p className="text-muted-foreground text-sm">
                Datum: {format(new Date(invoice.invoice_date), "dd.MM.yyyy")}
              </p>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              KUNDE
            </h4>
            <p className="font-medium">{invoice.customer_name}</p>
            <p className="font-medium">{invoice.customer_address}</p>

            {invoice.car_registration && (
              <p className="text-sm text-muted-foreground">
                Kennzeichen: {invoice.car_registration}
              </p>
            )}
          </div>

          {/* Tabela stavki */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pos.</TableHead>
                <TableHead>Leistung</TableHead>
                <TableHead className="text-center">Menge</TableHead>
                <TableHead className="text-right">Einzelpreis (€)</TableHead>
                <TableHead className="text-right">Gesamt (€)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-center">
                    {Number(item.quantity)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {Number(item.price).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {Number(item.total).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="border-t mt-4 pt-4 flex justify-end">
            <div className="text-right">
              <span className="text-muted-foreground mr-4">GESAMT:</span>
              <span className="text-2xl font-semibold font-mono">
                {Number(invoice.total).toFixed(2)} €
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 mb-6 print:block hidden">
        <br></br>
        <p className="text-sm text-muted-foreground mb-4">
          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
        </p>
        <br></br>
        <br></br>

        <div className="flex items-center mt-4">
          <span className="text-sm font-medium mr-2">Unterschrift:</span>
          <div className="flex-1 border-b border-muted-foreground h-6"></div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
