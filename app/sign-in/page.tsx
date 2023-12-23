"use client";
import Layout from "@/components/Layout";

import { useCallback } from "react";
import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const login = useCallback(async () => {
    const nip07signer = new NDKNip07Signer();
    const ndk = new NDK({
      explicitRelayUrls: ["wss://relay.primal.net"],
      signer: nip07signer,
    });

    await ndk.connect();

    const user = await nip07signer.user();

    if (!!user.pubkey) {
      console.log(user.pubkey);
      router.push("/dashboard");
      return;
    }
  }, []);

  return (
    <Layout heading="Login to LOBSTR">
      <button
        className="bg-primary text-white px-12 py-4 text-sm rounded-sm"
        onClick={login}
      >
        Use NOSTR signer
      </button>
    </Layout>
  );
};

export default SignIn;
