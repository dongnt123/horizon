import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.action";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {

  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    }

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken(public_token, user);
    router.push("/");
  }, [user, router]);

  const config: PlaidLinkOptions = { token, onSuccess };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button className="plaidlink-primary" onClick={() => open()} disabled={!ready}>Connect Bank</Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-ghost" variant="ghost" onClick={() => open()}>
          <Image src="/icons/connect-bank.svg" alt="Connect Bank" width={24} height={24} />
          <p className="text-[16px] font-semibold text-black-2 hidden xl:block">Connect Bank</p>
        </Button>
      ) : (
        <Button className="sidebar-link" onClick={() => open()}>
          <div className="relative size-6">
            <Image src="/icons/connect-bank.svg" alt="Connect Bank" width={24} height={24} />
          </div>
          <p className="sidebar-label">Connect Bank</p>
        </Button>
      )}
    </>
  )
}

export default PlaidLink;