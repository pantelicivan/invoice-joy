import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Plus, FileText, Eye } from "lucide-react";
import { format } from "date-fns";

interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_address: string;
  car_registration: string;
  invoice_date: string;
  total: number;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });
      setInvoices(data || []);
      setLoading(false);
    };
    fetchInvoices();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Rechnungen</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Übersicht aller erstellten Rechnungen
          </p>
        </div>
        <Link to="/new-invoice">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Neue Rechnung
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="invoice-shadow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Rechnungen gesamt</p>
            <p className="text-2xl font-semibold mt-1">{invoices.length}</p>
          </CardContent>
        </Card>
        <Card className="invoice-shadow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Gesamtumsatz</p>
            <p className="text-2xl font-semibold mt-1 font-mono">
              {invoices.reduce((s, i) => s + Number(i.total), 0).toFixed(2)} €
            </p>
          </CardContent>
        </Card>
        <Card className="invoice-shadow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Diesen Monat</p>
            <p className="text-2xl font-semibold mt-1">
              {
                invoices.filter((i) => {
                  const d = new Date(i.invoice_date);
                  const now = new Date();
                  return (
                    d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="invoice-shadow">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Laden...
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground">
                Keine Rechnungen vorhanden
              </p>
              <Link to="/new-invoice">
                <Button variant="outline" className="mt-3 gap-2">
                  <Plus className="w-4 h-4" /> Erste Rechnung erstellen
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nr.</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead className="text-right">Gesamt</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium font-mono">
                      {invoice.invoice_number}
                    </TableCell>
                    <TableCell>{invoice.customer_name}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {invoice.car_registration}
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.invoice_date), "dd.MM.yyyy")}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {Number(invoice.total).toFixed(2)} €
                    </TableCell>
                    <TableCell>
                      <Link to={`/invoice/${invoice.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
