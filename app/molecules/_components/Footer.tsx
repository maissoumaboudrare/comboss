"use client";

import { Section } from "@/app/atoms/_components/commons/Section";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto">
      <Section className="py-8">
      <p className="text-muted-foreground text-xs text-center">
          © {new Date().getFullYear()} Maïssoum Aboudrare. All rights reserved.
          <Link href="/legal-notice" className="underline ml-1">Legal notice</Link>.
        </p>
      </Section>
    </footer>
  );
};
