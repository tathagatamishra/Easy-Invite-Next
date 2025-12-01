// components/Home/Home.jsx
"use client";
import Image from "next/image";
import SimpleBtn from "../UI/Buttons/SimpleBtn";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };

  return (
    <main className="relative flex min-h-full w-full max-w-[1080px] flex-col items-center justify-center ">
      <nav className="absolute top-0 w-full flex flex-row justify-between items-center">
        <Image
          className=""
          src="/text-1764000615754.png"
          alt="Next.js logo"
          width={120}
          height={20}
          priority
          onClick={() => {
            navigate("/");
          }}
        />

        <SimpleBtn
          text="Log in"
          theme="light"
          width="w-fit sm:w-[158px] min-w-fit"
          navigateTo="/login"
        />
      </nav>

      <div className="relative w-full flex flex-row items-center justify-center sm:justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col gap-6">
          <h1 className="bg-[#ffffff] flex flex-col text-3xl font-semibold leading-10 tracking-tight z-[2]">
            <span>Create,</span> <span>customize, &</span> share invitations.
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-600 z-[2]">
            Make your events invitations personal, visual, and memorable with
            our{" "}
            <a href="#" className="font-medium text-zinc-950">
              Customizable Templates
            </a>{" "}
            and the{" "}
            <a href="#" className="font-medium text-zinc-950">
              Event Gallery
            </a>
            .
          </p>
        </div>

        <div className="w-[20%] aspect-square sm:block hidden z-[1]">
          <Image
            className=""
            src="/assets/camera.png"
            alt="assets"
            width={360}
            height={360}
          />
        </div>
      </div>

      <div className="absolute bottom-0 w-full flex flex-col gap-4 text-base sm:flex-row">
        <SimpleBtn
          text="Send an invitation"
          logo="/paper.png"
          theme="dark"
          onClick={() => {
            console.log("clicked");
          }}
          navigateTo="/dashboard"
        />
        <SimpleBtn text="Sign up" navigateTo="/signup" theme="light" />
      </div>
    </main>
  );
}
