import {
  Facebook,
  Instagram,
  LindkedlnFooter,
  Logo,
} from "@/components/elements";
import { FooterBg } from "@/components/elements/icons/FooterBg";
import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Solutions", href: "/" },
      { label: "How it works", href: "/" },
    ],
  },
];

const socialLinks = [
  { icon: <Facebook />, label: "Follow us on Facebook" },
  { icon: <Instagram />, label: "Follow us on Instagram" },
  { icon: <LindkedlnFooter />, label: "Follow us on Linkedln" },
];

export const Footer = () => {
  return (
    <div className="p-4">
      <footer className="bg-secondary-950 rounded-3xl py-24 sm:py-48 relative overflow-hidden">
        <div className="absolute h-full top-0">
          <FooterBg />
        </div>
        <div className="container relative">
          <div className="grid sm:grid-cols-6 xl:grid-cols-12 gap-8">
            <div className="col-span-3">
              <Logo />
            </div>
            <div className="col-span-9 grid sm:grid-cols-9 gap-8">
              <div className="col-span-6 grid grid-cols-1 ">
                {footerLinks.map((section, index) => (
                  <ul key={index} className="list-none text-white grid gap-6">
                    <label className="text-white font-semibold">
                      {section.title}
                    </label>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <div className="col-span-3 grid gap-4">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-1 bg-white/25 rounded-full"
                  >
                    <span className="bg-primary-300 p-3 flex items-center justify-center rounded-full">
                      {social.icon}
                    </span>
                    <p className="text-white font-medium">{social.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
