import Image from "next/image";
import React from "react";

export default function notfound() {
  return (
    <main className="relative flex min-h-full w-full max-w-[1080px] flex-col items-center justify-center ">
        <Image src="/assets/giphy.gif" alt="Vincent Vega" className="notFound" width={300} height={300} />
    </main>
  );
}
