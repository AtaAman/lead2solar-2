"use client";
import {
  Facebook,
  Instagram,
  LindkedlnFooter,
  Logo,
} from "@/components/elements";
import { FooterBg } from "@/components/elements/icons/FooterBg";
import Link from "next/link";
import headerData from "@/data/header.json";
import { useSearchParams } from "next/navigation";
import { WhatsappIcon } from "next-share";

const socialLinks = [
  {
    icon: <Facebook />,
    label: "Like our Facebook Page",
    href: "https://www.facebook.com/profile.php?id=61561767764351",
  },
  {
    icon: <Instagram />,
    label: "Follow us on Instagram",
    href: "https://www.instagram.com/lead.2solar/",
  },
  {
    icon: (
      <svg fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6">
        <path d="M13.601 2.326A7.854 7.854 0 007.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 003.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0013.6 2.326zM7.994 14.521a6.573 6.573 0 01-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 01-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 014.66 1.931 6.557 6.557 0 011.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 00-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
      </svg>
    ),
    label: "Chat with us on WhatsApp",
    href: "https://wa.me/message/6KAJW2HKQB2OD1",
  },
];

export const Footer = () => {
  const searchParams = useSearchParams();
  const pageType = searchParams.get("type");
  const isB2B = pageType === "b2b";

  return (
    <div className="p-4 bg-secondary-950">
      <footer className="bg-secondary-950 rounded-3xl py-12 sm:py-16 overflow-hidden">
        <div className="container">
          <div className="flex flex-col space-y-8">
            {/* First row */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-6 sm:mb-0">
                <Logo />
              </div>
              <div className="flex flex-wrap justify-start gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    href={social.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full md:w-fit items-center gap-2 p-1 bg-white/25 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <span className="bg-primary-300 p-2 flex items-center justify-center rounded-full">
                      {social.icon}
                    </span>
                    <p className="text-white text-sm font-medium pr-2">
                      {social.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-white/20" />

            {/* Second row */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-row flex-wrap gap-4">
                {headerData.header.map((item, index) => (
                  <ul
                    key={index}
                    className="list-none hover:bg-secondary-900 px-4 rounded-lg py-2 text-white flex flex-col sm:flex-row gap-4 sm:gap-8"
                  >
                    <Link
                      href={item?.href}
                      className="text-white/80 hover:text-white capitalize transition-colors"
                      scroll={true}
                    >
                      {item.label}
                    </Link>
                  </ul>
                ))}
                <ul className="list-none hover:bg-secondary-900 border px-4 rounded-lg py-2 text-white flex flex-col sm:flex-row gap-4 sm:gap-8">
                  {!isB2B ? (
                    <Link
                      href={"/?type=b2b"}
                      className="text-white/80 hover:text-white capitalize transition-colors"
                      scroll={true}
                    >
                      Are you a Business ?
                    </Link>
                  ) : (
                    <Link
                      href={"/"}
                      className="text-white/80 hover:text-white capitalize transition-colors"
                      scroll={true}
                    >
                      I want to install solar panels
                    </Link>
                  )}
                </ul>
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-white/60 text-sm">
                  © 2024 Lead2Solar. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
