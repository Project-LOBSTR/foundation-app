import NDK from "@nostr-dev-kit/ndk";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const ndk = new NDK({
      explicitRelayUrls: ["wss://relay.primal.net"],
    });

    ndk.connect(5000);
    console.log("connected to the relay!");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
