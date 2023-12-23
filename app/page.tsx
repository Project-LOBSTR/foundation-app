"use client";
import Layout from "@/components/Layout";
import NDK from "@nostr-dev-kit/ndk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

type Button = {
  id: string;
  label: string;
  button: string;
  onClick: () => void;
};

export default function Home() {
  const router = useRouter();

  // TODO: which router method is more performant?
  const buttons: Button[] = [
    {
      id: "sign-up",
      label: "New NOSTR user?",
      button: "Create new account",
      onClick: () => router.push("/sign-up"),
    },
    {
      id: "sign-in",
      label: "Existing NOSTR user?",
      button: "Sign in with NOSTR",
      onClick: () => router.push("/sign-in"),
    },
  ];

  return (
    <Layout heading="Welcome to LOBSTR">
      <div className="flex flex-col gap-4">
        {buttons.map((button: Button) => {
          return (
            <div key={button.id} className="flex flex-col items-center">
              <p className="text-black">{button.label}</p>
              <button
                className="bg-primary text-white px-12 py-4 text-sm rounded-sm"
                onClick={button.onClick}
              >
                {button.button}
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
