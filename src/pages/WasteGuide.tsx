import { motion } from "framer-motion";
import { Leaf, Recycle, Zap, AlertTriangle } from "lucide-react";

const categories = [
  {
    title: "Organic Waste",
    icon: <Leaf className="h-8 w-8" />,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100",
    items: ["Fruit & vegetable peels", "Coffee grounds & tea bags", "Eggshells", "Garden trimmings", "Paper napkins"],
    rules: [
      "Compost at home or use municipal green bins",
      "Never mix with plastic or metal",
      "Keep separate from cooked food waste (attracts pests)",
    ],
  },
  {
    title: "Recyclable",
    icon: <Recycle className="h-8 w-8" />,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100",
    items: ["Paper & cardboard", "Glass bottles & jars", "PET & HDPE plastic", "Aluminum & tin cans", "Clean milk cartons"],
    rules: [
      "Rinse containers before recycling",
      "Remove caps and lids (different material)",
      "Flatten cardboard to save space",
    ],
  },
  {
    title: "E-Waste",
    icon: <Zap className="h-8 w-8" />,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-100",
    items: ["Old phones & laptops", "Batteries", "Chargers & cables", "Light bulbs (CFL/LED)", "Broken appliances"],
    rules: [
      "Never throw in regular trash — contains toxic metals",
      "Find certified e-waste drop-off centers",
      "Remove personal data before disposal",
    ],
  },
  {
    title: "Hazardous",
    icon: <AlertTriangle className="h-8 w-8" />,
    color: "bg-red-50 text-red-700 border-red-200",
    iconBg: "bg-red-100",
    items: ["Paint & solvents", "Pesticides & chemicals", "Medical waste & syringes", "Motor oil & antifreeze", "Aerosol cans"],
    rules: [
      "Contact local hazardous waste collection",
      "Never pour down drains or mix with other waste",
      "Store in original containers with labels",
    ],
  },
];

const WasteGuide = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Waste Segregation Guide</h1>
        <p className="text-muted-foreground">Learn how to sort your household waste correctly.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border p-6 ${cat.color}`}
          >
            <div className={`inline-flex p-3 rounded-xl mb-4 ${cat.iconBg}`}>
              {cat.icon}
            </div>
            <h2 className="text-xl font-bold mb-4">{cat.title}</h2>

            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-2">Examples</h3>
            <ul className="text-sm space-y-1 mb-5">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-2">Quick Rules</h3>
            <ul className="text-sm space-y-1">
              {cat.rules.map((rule) => (
                <li key={rule} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default WasteGuide;
