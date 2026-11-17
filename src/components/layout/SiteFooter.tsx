import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/config/site";

export function SiteFooter() {
  const emailIsSet = site.contactEmail.includes("@");
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <Logo inverted className="text-2xl" />
          <p className="mt-4 max-w-sm text-white/85">{site.closingLine}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-white/85">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {emailIsSet ? (
              <a href={`mailto:${site.contactEmail}`} className="underline-offset-4 hover:underline">
                {site.contactEmail}
              </a>
            ) : (
              <span>{site.contactEmail}</span>
            )}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{site.classNote}</p>
          <p>Launching at CU Boulder · Concept stage</p>
        </div>
      </div>
    </footer>
  );
}
