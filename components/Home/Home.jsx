// components/Home/Home.jsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-full w-full max-w-[1080px] flex-col items-center justify-between sm:py-32 sm:px-16 py-6 pb-12 px-6">
      <nav className="w-full flex flex-row justify-between items-center">
        <Image
          className=""
          src="/text-1764000615754.png"
          alt="Next.js logo"
          width={120}
          height={20}
          priority
        />

        <button className="flex h-12 w-fit items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px]">
          Log in
        </button>
      </nav>

      <div className="relative w-full flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <div className="absolute top-[-95px] left-[-62px] -rotate-12 overflow-hidden w-[140px] h-[140px] md:block hidden z-[1]">
          <Image
            className=""
            src="/assets/love-message.png"
            alt="assets"
            width={360}
            height={360}
          />
        </div>

        <h1 className="bg-[#ffffff] rounded-tl-[12%] flex flex-col text-3xl font-semibold leading-10 tracking-tight z-[2]">
          <span>Create,</span> <span>customize, &</span> share invitations.
        </h1>

        <p className="max-w-md text-lg leading-8 text-zinc-600 z-[2]">
          Make your events invitations personal, visual, and memorable with our{" "}
          <a href="#" className="font-medium text-zinc-950">
            Customizable Templates
          </a>{" "}
          and the{" "}
          <a href="#" className="font-medium text-zinc-950">
            Event Gallery
          </a>
          .
        </p>

        <div className="absolute bottom-[10%] right-[10%] rotate-12 overflow-hidden w-[20%] aspect-square md:block hidden z-[1]">
          <Image
            className=""
            src="/assets/camera.png"
            alt="assets"
            width={360}
            height={360}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 text-base sm:flex-row">
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 text-[#ffffff] transition-colors hover:bg-[#383838] md:w-fit">
          <Image
            className=""
            src="/paper.png"
            alt="send"
            width={16}
            height={16}
          />
          Send an invitation
        </button>

        <button className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px]">
          Sign up
        </button>
      </div>
    </main>
  );
}
