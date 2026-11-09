import { Link } from "react-router-dom";
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Bio */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Dine<span className="text-orange-500">Ease</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
              Crafting memorable culinary moments with farm-to-table freshness, authentic wood-fired artisanal recipes, and Michelin-inspired hospitality.
            </p>
            <div className="flex gap-3 text-gray-400">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-gray-900 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-gray-900 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-gray-900 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-5">
              Explore DineEase
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition">
                  Our Full Menu
                </Link>
              </li>
              <li>
                <Link to="/book-table" className="hover:text-white transition">
                  Book a Table
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Location & Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-orange-400 transition inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-5">
              Dining Hours
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-200 block">Monday &ndash; Thursday:</strong>
                  <span>11:30 AM &ndash; 10:30 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-200 block">Friday &ndash; Sunday:</strong>
                  <span>11:00 AM &ndash; 11:30 PM</span>
                </div>
              </li>
              <li className="text-xs text-orange-300 font-medium pt-1">
                Kitchen closes 45 minutes before closing.
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-5">
              Restaurant Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>742 Gourmet Boulevard, Culinary District, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>hospitality@dineease.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} DineEase Gourmet Restaurant. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Prepared with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for culinary lovers everywhere</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
