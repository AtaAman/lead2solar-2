import { Facebook, Instagram, LindkedlnFooter, Logo } from "@/components/elements";
import { FooterBg } from "@/components/elements/icons/FooterBg";
import Link from "next/link";

const footerLinks = [
  {
    links: [
      { label: "About Us", href: "#about-us" },
      { label: "Process", href: "#process" },
      { label: "Estimate", href: "#estimate" },
    ],
  },
];

const socialLinks = [
  { icon: <Facebook />, label: "Like our Facebook Page" },
  { icon: <Instagram />, label: "Follow us on Instagram" },
  { icon: <LindkedlnFooter />, label: "Connect with us on LinkedIn" },
];

export const Footer = () => {
  return (
    <div className="p-4 bg-beige-primary">
      <footer className="bg-secondary-950 rounded-3xl py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute h-full top-0">
          <FooterBg />
        </div>
        <div className="container relative">
          <div className="flex flex-col space-y-8">
            {/* First row */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-6 sm:mb-0">
                <Logo />
              </div>
              <div className="flex flex-wrap justify-start gap-4">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="flex w-full md:w-fit items-center gap-2 p-1 bg-white/25 rounded-full"
                  >
                    <span className="bg-primary-300 p-2 flex items-center justify-center rounded-full">
                      {social.icon}
                    </span>
                    <p className="text-white text-sm font-medium pr-2">{social.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-white/20" />

            {/* Second row */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div>
                {footerLinks.map((section, index) => (
                  <ul key={index} className="list-none text-white flex flex-col sm:flex-row gap-4 sm:gap-8">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-white/60 text-sm">© 2024 Lead2Solar. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
