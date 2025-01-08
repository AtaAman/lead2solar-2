"use client";
import { Button, Logo, Menu } from "@/components/elements";
import { GetAQuote } from "@/components/elements/get-a-quote";
import { cn } from "@/components/elements/utils";
import headerData from "@/data/header.json";

import { useWindScreenowSize } from "@/hooks/useWindowSize";
import useDetectScroll from "@smakss/react-scroll-direction";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const { scrollDir } = useDetectScroll();
  const searchParams = useSearchParams();
  const pageType = searchParams.get("type");
  const isB2B = pageType === "b2b";

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const size = useWindScreenowSize();

  useEffect(() => {
    if (size.width > 768) {
      setShowMenu(false);
    }
  }, [size.width]);

  return (
    <header
      className={cn(
        "fixed w-full bg-secondary-950 border-b-2 border-primary-300 z-20 py-4 transition-transform duration-300",
        scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-4 lg:gap-10">
          <Link href="/" className="z-10">
            <Logo />
          </Link>
          <nav
            className={cn(
              "fixed top-0 left-0 w-screen h-screen bg-secondary-950 flex flex-col items-center justify-center gap-6 text-white transition-transform duration-300 lg:static lg:w-auto lg:h-auto lg:bg-transparent lg:flex-row lg:translate-y-0",
              showMenu ? "translate-y-0" : "-translate-y-full"
            )}
          >
            {(isB2B ? headerData.b2bHeaders : headerData.header).map(
              (item, index) => (
                <li key={index} className="list-none">
                  <Link
                    href={item.href}
                    className="capitalize hover:text-primary-300 transition-colors"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            {/* Mobile-specific CTA */}
            {size.width <= 768 && (
              <div className="flex flex-col items-center gap-4">
                {!isB2B ? (
                  <Link
                    href={"/?type=b2b"}
                    className="text-white/80 hover:text-white capitalize transition-colors"
                    onClick={toggleMenu}
                  >
                    Are you a Business?
                  </Link>
                ) : (
                  <Link
                    href={"/"}
                    className="text-white/80 hover:text-white capitalize transition-colors"
                    onClick={toggleMenu}
                  >
                    I want to install solar panels
                  </Link>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Buttons and Menu Toggle */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={toggleMenu}
            className="p-2 aspect-square flex items-center justify-center border rounded-full text-white lg:hidden"
          >
            <Menu />
          </button>
          {!isB2B && size.width > 768 && (
            <div className="flex items-center gap-8">
              <GetAQuote>
                <Button variant="tetriary-reversed">Get A Quote</Button>
              </GetAQuote>
              <Link
                href={"/?type=b2b"}
                className="text-white/80  border hover:bg-yellow-300 border-gray-100 rounded-full p-3 hover:text-black capitalize transition-colors"
              >
                Are you a Business?
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
