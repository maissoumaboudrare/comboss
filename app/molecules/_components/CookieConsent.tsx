"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CookieIcon } from "lucide-react";
import Link from "next/link";

const CookieConsent = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie = "cookieConsent=true; expires=" + new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
    setTimeout(() => {
      setHide(true);
    }, 700);
  };

  const decline = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
      router.push("https://www.google.com/");
    }, 700);
  };

  useEffect(() => {
    if (!document.cookie.includes("cookieConsent=true")) {
      setIsOpen(true);
    } else {
      setHide(true);
    }
  }, []);

  return (
    <div className={`fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md transition-transform duration-700 ${!isOpen ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"} ${hide && "hidden"}`}>
      <div className="bg-secondary rounded-lg m-2">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">We use cookies</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem] animate-bounce" />
          </div>
          <div className="p-4">
            <p className="text-sm font-normal">
              We use cookies to ensure you get the best experience on our website. For more information on how we use cookies, please see our cookie policy.
              <br /><br />
              <span className="text-xs">By clicking &quot;<span className="font-medium opacity-80">Accept</span>&quot;, you agree to our use of cookies.</span>
              <br />
              <Link href="/legal-notice" className="underline mx-1">Learn more.</Link>
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border bg-background/20">
            <Button onClick={accept} className="w-full">Accept</Button>
            <Button onClick={decline} className="w-full" variant="secondary">Decline</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;