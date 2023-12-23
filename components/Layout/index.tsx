import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  heading?: string;
};

const Layout = ({ heading, children }: Props) => {
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
        {heading && (
          <h1 className="text-primary font-heading text-xl">{heading}</h1>
        )}
      </div>
      {children}
    </main>
  );
};

export default Layout;
