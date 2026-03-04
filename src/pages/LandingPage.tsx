import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Wrench,
  ShieldCheck,
  Zap,
  Star,
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
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src={jakiLogo}
              alt="Jaki Reifenservice"
              className="h-10 rounded-lg"
            />
            <span className="font-bold text-lg tracking-tight text-foreground">
              Jaki Reifenservice
            </span>
          </div>
          <div className="flex items-center gap-2">
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
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Werkstatt"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-32 sm:py-44">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5" /> Ihr Reifenprofi in der Region
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1] mb-6">
              Professioneller
              <br />
              <span className="text-accent">Reifenservice</span>
              <br />
              für Ihr Fahrzeug
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md mb-8 leading-relaxed">
              Schnell, zuverlässig und zu fairen Preisen. Vertrauen Sie auf
              unsere langjährige Erfahrung im Reifenservice.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+4917612345678">
                <Button size="lg" className="gap-2 text-base">
                  <Phone className="w-4 h-4" /> Jetzt anrufen
                </Button>
              </a>
              <a href="#leistungen">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Unsere Leistungen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
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
                className="invoice-shadow-lg hover:shadow-xl transition-shadow border-border group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
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

      {/* About */}
      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                Über uns
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Ihr Vertrauenspartner
                <br />
                für Reifenservice
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Jaki Reifenservice steht für Qualität, Zuverlässigkeit und faire
                Preise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Egal ob PKW, SUV oder Transporter – bei uns ist Ihr Fahrzeug in
                besten Händen. Wir verwenden modernste Technik und arbeiten
                schnell und gewissenhaft.
              </p>
            </div>
            <div className="relative">
              <img
                src={heroBg}
                alt="Werkstatt"
                className="rounded-2xl invoice-shadow-lg object-cover w-full h-80"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 invoice-shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Geprüfte Qualität</p>
                    <p className="text-xs text-muted-foreground">
                      Professionelle Arbeit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
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
            <Card className="invoice-shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Telefon</h3>
                <a
                  href="tel:+4917612345678"
                  className="text-muted-foreground text-sm hover:text-accent transition-colors">
                  +49 176 367 585 20
                </a>
              </CardContent>
            </Card>
            <Card className="invoice-shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Adresse</h3>
                <p className="text-muted-foreground text-sm">
                  Daimlerstr. 19
                  <br />
                  73117 Wangen
                </p>
              </CardContent>
            </Card>
            {/* <Card className="invoice-shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Öffnungszeiten</h3>
                <p className="text-muted-foreground text-sm">
                  Mo–Fr: 8:00–18:00
                  <br />
                  Sa: 9:00–14:00
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
