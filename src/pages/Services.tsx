import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

const Services = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: "", price: "", unit: "Stk", description: "" });

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("name");
    if (error) {
      toast.error("Fehler beim Laden der Leistungen");
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setForm({ name: "", price: "", unit: "Stk", description: "" });
    setEditingService(null);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name der Leistung ist erforderlich");
      return;
    }

    const serviceData = {
      name: form.name.trim(),
      price: parseFloat(form.price) || 0,
      unit: form.unit.trim() || "Stk",
      description: form.description.trim(),
      user_id: user!.id,
    };

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", editingService.id);
      if (error) {
        toast.error("Fehler beim Aktualisieren der Leistung");
        return;
      }
      toast.success("Leistung aktualisiert");
    } else {
      const { error } = await supabase.from("services").insert(serviceData);
      if (error) {
        toast.error("Fehler beim Hinzufügen der Leistung");
        return;
      }
      toast.success("Leistung hinzugefügt");
    }

    resetForm();
    setDialogOpen(false);
    fetchServices();
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setForm({
      name: service.name,
      price: service.price.toString(),
      unit: service.unit,
      description: service.description || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast.error("Fehler beim Löschen der Leistung");
      return;
    }
    toast.success("Leistung gelöscht");
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Leistungen</h1>
          <p className="text-muted-foreground text-sm mt-1">Verwalten Sie Ihre Leistungen und Preise</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Leistung hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? "Leistung bearbeiten" : "Neue Leistung"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name der Leistung" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preis</Label>
                  <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Einheit</Label>
                  <Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="Stk" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Beschreibung (optional)" rows={3} />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingService ? "Änderungen speichern" : "Leistung hinzufügen"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="invoice-shadow">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Laden...</div>
          ) : services.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Keine Leistungen vorhanden. Klicken Sie auf "Leistung hinzufügen" um zu beginnen.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Preis</TableHead>
                  <TableHead>Einheit</TableHead>
                  <TableHead>Beschreibung</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.price.toFixed(2)} €</TableCell>
                    <TableCell>{service.unit}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{service.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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

export default Services;
