"use client";
import { Button, Logo, Menu } from "@/components/elements";
import { GetAQuote } from "@/components/elements/get-a-quote";
import { CompanyInquiryForm } from "@/components/elements/get-a-quote-b2b";
import { cn } from "@/components/elements/utils";
import headerData from "@/data/header.json";

import { useWindScreenowSize } from "@/hooks/useWindowSize";
import useDetectScroll from "@smakss/react-scroll-direction";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
    const { scrollDir } = useDetectScroll();
    const searchParams = useSearchParams()
    const pageType = searchParams.get('type')
    const isB2B = pageType === 'b2b'

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
                " sm:border-b-2 duration-300 bg-secondary-950 border-primary-300 fixed w-full py-6",
                scrollDir === "down" ? "-translate-y-full" : "translate-y-0",
                "z-20"
            )}
        >
            <div className="container flex justify-between">
                <div className="flex justify-center items-center gap-10">
                    <Link href="/" className="z-10">
                        <Logo />
                    </Link>
                    <nav
                        className={cn(
                            "list-none bg-secondary-950 sm:bg-transparent  duration-300 sm:translate-y-0 absolute h-screen top-0 left-0 w-screen justify-center flex-col sm:relative sm:h-fit sm:w-fit sm:flex-row  flex items-center text-white gap-8",
                            showMenu === true ? "translate-y-0" : "-translate-y-full"
                        )}
                    >
                        {isB2B ? headerData.b2bHeaders.map((item, index) => {
                            return (
                                <li key={index} className="" onClick={toggleMenu}>
                                    <Link className="capitalize" scroll={true} href={item.href}>
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        }) : headerData.header.map((item, index) => {
                            return (
                                <li key={index} className="" onClick={toggleMenu}>
                                    <Link className="capitalize" scroll={true} href={item.href}>
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex gap-2 h-fit z-10">
                    <button
                        onClick={toggleMenu}
                        className="px-4 aspect-square flex items-center justify-center border w-fit sm:hidden rounded-full"
                    >
                        <Menu />
                    </button>

                    {
                        !isB2B &&
                        <GetAQuote>
                            <Button variant="tetriary-reversed">Get A Quote</Button>
                        </GetAQuote>
                    }
                </div>
            </div>
        </header>
    );
};
