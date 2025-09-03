import React from "react";
import { Link } from "react-router-dom";

const YEAR = new Date().getFullYear();
const R43_URL = "https://r43digitaltech.com"; 

const Footer: React.FC = () => (
  <footer className="relative border-t border-slate-200 bg-green-100">
    {/* Soft accent line */}
    <div
      className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent"
      aria-hidden
    />

    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand / Summary */}
        <div>
          <div className="text-lg font-semibold text-slate-900">
            Jungle Kids Early Learning
          </div>
          <p className="mt-2 text-sm text-slate-600">
            A safe, joyful place where kids learn through play.
          </p>

          {/* Trust chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-200">
              Now Enrolling
            </span>
            <a
              href="https://mybrightwheel.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              title="We use Brightwheel for check-in, messaging, and daily updates"
            >
              ✨ We use Brightwheel
            </a>
          </div>

          {/* Social */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/61573180175113"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Visit */}
        <div>
          <h2 className="font-semibold text-slate-900">Visit</h2>
          <address className="not-italic">
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              <li>282 W 1st Ave</li>
              <li>Colville, WA 99114</li>
              <li>Mon-Fri · 6:00 AM-6:00 PM</li>
            </ul>
          </address>
          <div className="mt-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=282+W+1st+Ave,+Colville,+WA+99114"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
            >
              Open in Maps
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-slate-900">Contact</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>
              📞{" "}
              <a
                className="underline-offset-4 hover:underline"
                href="tel:15096857056"
              >
                (509) 685-7056
              </a>
            </li>
            <li>
              📧{" "}
              <a
                className="underline-offset-4 hover:underline"
                href="mailto:Junglekidsearlylearning@gmail.com"
              >
                Junglekidsearlylearning@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer - Quick Links">
          <h2 className="font-semibold text-slate-900">Quick Links</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>
              <Link className="hover:text-slate-900" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-900" to="/information">
                Information
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-900" to="/facility">
                Facility Pictures
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-900" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-600 sm:flex-row">
        <div>© {YEAR} Jungle Kids. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 hover:bg-slate-100"
          >
            Back to top ↑
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href={R43_URL}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-slate-800"
            aria-label="Created by r43digitaltech"
          >
            Created by r43digitaltech
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
