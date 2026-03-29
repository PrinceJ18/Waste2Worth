import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Send, CheckCircle } from "lucide-react";

const mockLocations = [
  { name: "GreenCycle E-Waste Hub", type: "E-Waste", address: "42 Industrial Park, Sector 5", phone: "+91 98765 43210" },
  { name: "EcoCollect NGO", type: "Recyclable", address: "18 Green Lane, Koramangala", phone: "+91 98765 43211" },
  { name: "CompostNow Community", type: "Organic", address: "7 Garden Road, HSR Layout", phone: "+91 98765 43212" },
  { name: "RecycleKaro Foundation", type: "All Waste", address: "55 MG Road, Indiranagar", phone: "+91 98765 43213" },
];

const Community = () => {
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? mockLocations : mockLocations.filter((l) => l.type === filter);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Community & Pickup</h1>
          <p className="text-muted-foreground">Find local recyclers, NGOs, and request waste pickups.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", "E-Waste", "Recyclable", "Organic"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-card card-surface text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Locations */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {filtered.map((loc) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-5 rounded-2xl card-surface"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{loc.name}</h3>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground">{loc.type}</span>
                  <p className="text-sm text-muted-foreground mt-1">{loc.address}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" /> {loc.phone}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pickup Request */}
        <div className="bg-card rounded-2xl card-surface p-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2">Request Pickup</h2>
          <p className="text-sm text-muted-foreground mb-6">Fill in your details and we'll connect you with the nearest recycler.</p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-8 text-center"
            >
              <CheckCircle className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Request Submitted!</h3>
              <p className="text-sm text-muted-foreground">We'll contact you within 24 hours. Estimated impact: 0.5 kg waste diverted.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your name"
                required
                className="w-full px-4 py-3 bg-muted rounded-[8px] text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="text"
                placeholder="Address"
                required
                className="w-full px-4 py-3 bg-muted rounded-[8px] text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <select className="w-full px-4 py-3 bg-muted rounded-[8px] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>E-Waste</option>
                <option>Recyclable</option>
                <option>Organic</option>
                <option>Hazardous</option>
              </select>
              <textarea
                placeholder="Additional notes..."
                rows={3}
                className="w-full px-4 py-3 bg-muted rounded-[8px] text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-[8px] font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4" />
                Submit Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
