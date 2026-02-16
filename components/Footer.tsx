import React from "react";
import { Logo } from "../constants";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white inline-block p-2 rounded-xl">
              <Logo className="h-24 md:h-30" />
            </div>
            <p className="text-slate-400 leading-relaxed">
              AddyHolly Homes & Properties is your trusted partner in the world
              of luxury real estate. We combine expertise with a personalized
              touch to help you secure the perfect property.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-slate-800 p-2.5 rounded-lg hover:bg-amber-500 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Featured Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Recent Sales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Market Insights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-amber-400">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Real Estate Investment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home Valuation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mortgage Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Legal Consultations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-amber-400">
              Contact Us
            </h4>
            <ul className="space-y-6 text-slate-400">
              <li className="flex gap-4">
                <MapPin className="text-amber-500 shrink-0" size={20} />
                <span>
                  1 Emmanuel Avenue
                  <br />
                  Ogombo Ajah, Lagos
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-amber-500 shrink-0" size={20} />
                <span>+234 (906) 067 5930</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-amber-500 shrink-0" size={20} />
                <span>addyhollyhomes@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} AddyHolly Homes & Properties. All
            rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">
              Sitemap
            </a>
            <a href="#" className="hover:text-white">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
