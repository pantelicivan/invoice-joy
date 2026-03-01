import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Save, Printer, Plus, Trash2, Search } from "lucide-react";
import { format } from "date-fns";

interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

interface InvoiceItem {
  service_id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  total: number;
}

interface CompanyProfile {
  company_name: string;
  address: string;
  phone: string;
  email: string;
  pib: string;
  maticni_broj: string;
}

const NewInvoice = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [carRegistration, setCarRegistration] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [companyRes, servicesRes] = await Promise.all([
        supabase.from("company_profiles").select("*").eq("user_id", user!.id).single(),
        supabase.from("services").select("*").order("name"),
      ]);
      if (companyRes.data) setCompany(companyRes.data);
      if (servicesRes.data) setServices(servicesRes.data);
    };
    fetchData();
  }, [user]);

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItem = (service: Service) => {
    const exists = items.find((i) => i.service_id === service.id);
    if (exists) {
      toast.info("Usluga je već dodata");
      return;
    }
    setItems([
      ...items,
      {
        service_id: service.id,
        name: service.name,
        quantity: 1,
        price: service.price,
        unit: service.unit,
        total: service.price,
      },
    ]);
    setSearchQuery("");
    setShowSearch(false);
  };

  const updateItem = (index: number, field: "quantity" | "price", value: number) => {
    const updated = [...items];
    updated[index][field] = value;
    updated[index].total = updated[index].quantity * updated[index].price;
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  const handleSave = async () => {
    if (!customerName.trim()) {
      toast.error("Unesite ime kupca");
      return;
    }
    if (items.length === 0) {
      toast.error("Dodajte bar jednu uslugu");
      return;
    }

    setSaving(true);
    try {
      // Generate invoice number
      const { count } = await supabase
        .from("invoices")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);

      const invoiceNumber = `FA-${String((count || 0) + 1).padStart(4, "0")}`;

      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          user_id: user!.id,
          invoice_number: invoiceNumber,
          customer_name: customerName.trim(),
          car_registration: carRegistration.trim(),
          invoice_date: invoiceDate,
          total: grandTotal,
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      const invoiceItems = items.map((item) => ({
        invoice_id: invoice.id,
        service_id: item.service_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        unit: item.unit,
        total: item.total,
      }));

      const { error: itemsError } = await supabase.from("invoice_items").insert(invoiceItems);
      if (itemsError) throw itemsError;

      toast.success(`Faktura ${invoiceNumber} je sačuvana`);
      navigate("/");
    } catch (error: any) {
      toast.error("Greška pri čuvanju fakture");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-semibold">Nova faktura</h1>
          <p className="text-muted-foreground text-sm mt-1">Kreirajte novu fakturu</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" /> Štampaj
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" /> {saving ? "Čuvanje..." : "Sačuvaj"}
          </Button>
        </div>
      </div>

      <div ref={printRef}>
        {/* Invoice Header */}
        <Card className="invoice-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{company?.company_name || "Vaša firma"}</h2>
                {company?.address && <p className="text-muted-foreground text-sm mt-1">{company.address}</p>}
                {company?.phone && <p className="text-muted-foreground text-sm">{company.phone}</p>}
                {company?.email && <p className="text-muted-foreground text-sm">{company.email}</p>}
                {company?.pib && <p className="text-muted-foreground text-sm">PIB: {company.pib}</p>}
                {company?.maticni_broj && <p className="text-muted-foreground text-sm">MB: {company.maticni_broj}</p>}
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-primary">FAKTURA</h3>
                <p className="text-muted-foreground text-sm mt-1">Datum: {invoiceDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card className="invoice-shadow mt-4">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">PODACI KUPCA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Ime kupca</Label>
                <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Ime i prezime / Firma" />
              </div>
              <div className="space-y-2">
                <Label>Registarska oznaka</Label>
                <Input value={carRegistration} onChange={(e) => setCarRegistration(e.target.value)} placeholder="BG-1234-AA" />
              </div>
              <div className="space-y-2">
                <Label>Datum fakture</Label>
                <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Search */}
        <Card className="invoice-shadow mt-4 no-print">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">DODAJ USLUGU</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Pretražite usluge po nazivu..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearch(true);
                }}
                onFocus={() => setShowSearch(true)}
              />
              {showSearch && searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-card border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredServices.length === 0 ? (
                    <div className="p-3 text-sm text-muted-foreground">Nema rezultata</div>
                  ) : (
                    filteredServices.map((service) => (
                      <button
                        key={service.id}
                        className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors flex items-center justify-between border-b last:border-b-0"
                        onClick={() => addItem(service)}
                      >
                        <div>
                          <span className="font-medium">{service.name}</span>
                          <span className="text-muted-foreground text-sm ml-2">({service.unit})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono">{service.price.toFixed(2)} RSD</span>
                          <Plus className="w-4 h-4 text-primary" />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card className="invoice-shadow mt-4">
          <CardContent className="p-0">
            {items.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Pretražite i dodajte usluge iznad
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usluga</TableHead>
                    <TableHead className="w-28">Količina</TableHead>
                    <TableHead className="w-36">Cena</TableHead>
                    <TableHead className="w-24">Jedinica</TableHead>
                    <TableHead className="w-36 text-right">Ukupno</TableHead>
                    <TableHead className="w-12 no-print"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                          className="w-32"
                        />
                      </TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        {item.total.toFixed(2)} RSD
                      </TableCell>
                      <TableCell className="no-print">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(index)} className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {items.length > 0 && (
              <div className="border-t p-4 flex justify-end">
                <div className="text-right">
                  <span className="text-muted-foreground text-sm mr-4">UKUPNO:</span>
                  <span className="text-xl font-semibold font-mono">{grandTotal.toFixed(2)} RSD</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewInvoice;
