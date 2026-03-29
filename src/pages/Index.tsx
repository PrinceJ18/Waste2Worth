import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScanLine, Hammer, Users } from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import heroBg from "../assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Turn your waste into{" "}
              <span className="text-primary">worth</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Use AI to identify household waste, discover DIY upcycling recipes,
              and track your contribution to a greener planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scanner"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-[8px] font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                <ScanLine className="h-5 w-5" />
                Try AI Scanner
              </Link>
              <Link
                to="/diy"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-[8px] font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                <Hammer className="h-5 w-5" />
                Explore DIY
              </Link>
              <Link
                to="/community"
                className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-8 py-4 rounded-[8px] font-semibold text-lg card-surface hover:card-surface-hover transition-shadow"
              >
                <Users className="h-5 w-5" />
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center text-foreground mb-10"
          >
            Global Community Impact
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <AnimatedCounter end={24839} label="Items Recycled" />
            <AnimatedCounter end={1245.6} label="kg Plastic Saved" suffix=" kg" decimals={1} />
            <AnimatedCounter end={3891} label="kg CO₂ Prevented" suffix=" kg" />
            <AnimatedCounter end={8421} label="Contributors" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Scan", desc: "Upload a photo of your waste item. Our AI identifies it instantly.", icon: "📸" },
              { step: "2", title: "Discover", desc: "Get upcycling ideas, DIY guides, and proper disposal methods.", icon: "💡" },
              { step: "3", title: "Track", desc: "Log your actions and watch your personal impact grow.", icon: "📊" },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl card-surface text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-sm font-semibold text-primary mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
