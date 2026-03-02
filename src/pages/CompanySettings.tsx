import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

const CompanySettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    address: "",
    phone: "",
    email: "",
    pib: "",
    maticni_broj: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      if (!error && data) {
        setForm({
          company_name: data.company_name || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          pib: data.pib || "",
          maticni_broj: data.maticni_broj || "",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("company_profiles")
      .update(form)
      .eq("user_id", user!.id);
    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      toast.success("Einstellungen gespeichert");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Laden...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Firmeneinstellungen</h1>
        <p className="text-muted-foreground text-sm mt-1">Diese Daten werden auf den Rechnungen angezeigt</p>
      </div>

      <Card className="invoice-shadow max-w-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Firmenname</Label>
            <Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} placeholder="Ihre Firma GmbH" />
          </div>
          <div className="space-y-2">
            <Label>Adresse</Label>
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Straße Nr., Stadt" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+49..." />
            </div>
            <div className="space-y-2">
              <Label>E-Mail</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="firma@email.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>USt-IdNr.</Label>
              <Input value={form.pib} onChange={(e) => setForm({ ...form, pib: e.target.value })} placeholder="DE123456789" />
            </div>
            <div className="space-y-2">
              <Label>Handelsregister (HRB)</Label>
              <Input value={form.maticni_broj} onChange={(e) => setForm({ ...form, maticni_broj: e.target.value })} placeholder="HRB 12345" />
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Speichern..." : "Einstellungen speichern"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySettings;
