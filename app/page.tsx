"use client";
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

  useEffect(() => {
    const ndk = new NDK({
      explicitRelayUrls: ["wss://relay.primal.net"],
    });

    ndk.connect(5000);
    console.log("connected to the relay!");
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-white items-center gap-10 justify-center p-12">
      <div className="items-center flex flex-col">
        <Image
          src={"/lobstr-logo.png"}
          alt="Lobstrrr"
          width={500}
          height={500}
          priority
        />
        <h1 className="text-primary font-heading text-xl">Welcome to LOBSTR</h1>
      </div>
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
    </main>
  );
}
