import { Shield } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "monsoon-warrior";

  const columns = [
    {
      title: "About",
      links: ["Our Mission", "Team", "Press Kit", "Blog"],
    },
    {
      title: "How It Works",
      links: ["Register as Rider", "Buy Coverage", "Claims Process", "Payouts"],
    },
    {
      title: "API Documentation",
      links: ["Getting Started", "Authentication", "Endpoints", "Webhooks"],
    },
    {
      title: "Contact",
      links: ["Support", "Partnerships", "GitHub", "Community"],
    },
  ];

  return (
    <footer className="relative border-t border-[rgba(120,190,200,0.12)] mt-20">
      <div className="navbar-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-7 h-7 text-teal" />
                <span className="font-bold text-white">
                  Monsoon <span className="text-teal">Warrior</span>
                </span>
              </div>
              <p className="text-sm text-[#7E93A8] leading-relaxed">
                AI-powered parametric income protection for India's gig economy
                riders.
              </p>
              <div className="flex gap-3 mt-4">
                <a
                  href="https://github.com"
                  className="text-[#7E93A8] hover:text-teal transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.link"
                >
                  <SiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-[#7E93A8] hover:text-teal transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.link"
                >
                  <SiX className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-[#7E93A8] hover:text-teal transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.link"
                >
                  <SiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="/"
                        className="text-sm text-[#7E93A8] hover:text-teal transition-colors"
                        data-ocid="footer.link"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(120,190,200,0.1)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#7E93A8]">
              © {year} Monsoon Warrior. Built for Hackathon.
            </p>
            <p className="text-sm text-[#7E93A8]">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
