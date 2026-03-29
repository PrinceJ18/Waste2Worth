import { Leaf, Github, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background py-12 mt-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <Leaf className="h-5 w-5" />
            Waste2Worth
          </div>
          <p className="text-sm opacity-70">
            Empowering households to turn waste into worth through AI and community.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Features</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/scanner" className="hover:opacity-100">AI Scanner</Link>
            <Link to="/diy" className="hover:opacity-100">DIY Upcycling</Link>
            <Link to="/guide" className="hover:opacity-100">Waste Guide</Link>
            <Link to="/dashboard" className="hover:opacity-100">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Community</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/community" className="hover:opacity-100">Find Recyclers</Link>
            <Link to="/community" className="hover:opacity-100">Request Pickup</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <div className="flex gap-3">
            <a href="#" className="opacity-70 hover:opacity-100"><Github className="h-5 w-5" /></a>
            <a href="#" className="opacity-70 hover:opacity-100"><Youtube className="h-5 w-5" /></a>
            <a href="#" className="opacity-70 hover:opacity-100"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/20 pt-6 text-center text-sm opacity-50">
        © 2026 Waste2Worth. Built for a greener planet.
      </div>
    </div>
  </footer>
);

export default Footer;
