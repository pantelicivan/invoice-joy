import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  MapPin,
  ChevronRight,
  Wrench,
  ShieldCheck,
  Zap,
  Star,
  Menu,
  X,
} from "lucide-react";
import jakiLogo from "@/assets/jaki-logo.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  {
    icon: Wrench,
    title: "Reifenwechsel",
    desc: "Professioneller Sommer- & Winterreifenwechsel für alle Fahrzeugtypen.",
  },
  {
    icon: ShieldCheck,
    title: "Auswuchten",
    desc: "Präzises Auswuchten für ruhiges Fahren und gleichmäßigen Reifenverschleiß.",
  },
  {
    icon: Zap,
    title: "Reifenreparatur",
    desc: "Schnelle Reparatur bei Reifenpannen – damit Sie sicher weiterfahren.",
  },
  {
    icon: Wrench,
    title: "KFZ-Service",
    desc: "Allgemeiner KFZ-Service und Wartung für alle Fahrzeugmarken.",
  },
  {
    icon: Zap,
    title: "Pannendienst (Reifenpanne & Batterie)",
    desc: "Schnelle Hilfe bei Reifenpannen oder Batterieproblemen – wir sind für Sie da.",
  },
];
const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src={jakiLogo}
              alt="Jaki Reifenservice"
              className="h-9 rounded-lg"
            />
            <span className="font-bold text-base sm:text-lg tracking-tight text-foreground">
              Jaki Reifenservice
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-2">
            <a href="#leistungen">
              <Button variant="ghost" size="sm">
                Leistungen
              </Button>
            </a>
            <a href="#kontakt">
              <Button variant="ghost" size="sm">
                Kontakt
              </Button>
            </a>
            <Link to="/auth">
              <Button size="sm" className="gap-1.5">
                Anmelden <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="sm:hidden bg-background border-t border-border px-4 pb-4 space-y-2">
            <a href="#leistungen" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Leistungen
              </Button>
            </a>
            <a href="#kontakt" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Kontakt
              </Button>
            </a>
            <Link to="/auth" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gap-1.5">
                Anmelden <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Werkstatt"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 lg:py-44">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5" />
              Ihr Reifenprofi in der Region
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1] mb-6">
              Professioneller
              <br />
              <span className="text-accent">Reifenservice</span>
              <br />
              für Ihr Fahrzeug
            </h1>

            <p className="text-base sm:text-lg text-primary-foreground/80 max-w-md mb-8 leading-relaxed">
              Schnell, zuverlässig und zu fairen Preisen. Vertrauen Sie auf
              unsere langjährige Erfahrung im Reifenservice.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+4917636758520">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Phone className="w-4 h-4" /> Jetzt anrufen
                </Button>
              </a>
              <a href="#leistungen">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Unsere Leistungen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="leistungen" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              Was wir bieten
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Unsere Leistungen
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Vom einfachen Reifenwechsel bis zur professionellen Einlagerung –
              wir kümmern uns um alles rund um Ihre Reifen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card
                key={s.title}
                className="hover:shadow-xl transition-shadow border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="kontakt" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              Kontakt
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              So erreichen Sie uns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="w-6 h-6 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Telefon</h3>
                <a
                  href="tel:+4917636758520"
                  className="text-muted-foreground text-sm hover:text-accent block py-1">
                  +49 176 367 585 20
                </a>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="w-6 h-6 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Adresse</h3>
                <p className="text-muted-foreground text-sm">
                  Daimlerstr. 19
                  <br />
                  73117 Wangen
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img
              src={jakiLogo}
              alt="Jaki Reifenservice"
              className="h-8 rounded"
            />
            <span className="font-semibold text-foreground">
              Jaki Reifenservice
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jaki Reifenservice. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
