import BidNowLogo from "./BidNowLogo";

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BidNowLogo size="sm" variant="gradient" />
              <span className="font-display text-lg font-bold text-slate-900">
                BidNow
              </span>
            </div>
            <p className="text-sm text-slate-600">
              The fastest way to discover and bid on amazing items.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Help center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Safety
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-600">
            © 2026 BidNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
