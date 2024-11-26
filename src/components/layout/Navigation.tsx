'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/accounts", label: "Accounts" },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="border-b bg-white">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            Distributed Bank
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {navItems.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium transition-colors",
                                    pathname === href
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
