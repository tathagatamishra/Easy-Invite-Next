// components/Dashboard/Dashboard.jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import SimpleBtn from "../UI/Buttons/SimpleBtn";
import { useRouter } from "next/navigation";
import "./Dashboard.css";
import SimpleInput from "../UI/Inputs/SimpleInput";
import { FiPlus, FiSettings, FiGrid, FiImage } from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };
  return (
    <main className="relative flex min-h-full w-full max-w-[1080px] flex-row items-center gap-6">
      <section className="w-[280px] min-w-[208px] h-full flex flex-col items-center justify-between gap-6 p-4 rounded-3xl border border-solid border-black/[.08]">
        <Image
          className="mb-4"
          src="/text-1764000615754.png"
          alt="Next.js logo"
          width={120}
          height={20}
          priority
          onClick={() => {
            navigate("/dashboard");
          }}
        />
        <div className="w-full h-full flex flex-col gap-4">
          <SimpleBtn
            icon={<FiPlus />}
            text="New event"
            theme="dark"
            width="w-full"
            tailwind="mb-4"
            onClick={() => {
              console.log("create new event");
            }}
          />

          <div className="w-full h-full flex flex-col gap-4">
            <SimpleBtn
              text="Event 1"
              theme="light"
              width="w-full"
              tailwind="justify-start"
              navigateTo="/login"
            />
            <SimpleBtn
              text="Event 2"
              theme="light"
              width="w-full"
              tailwind="justify-start"
              navigateTo="/login"
            />
            <SimpleBtn
              text="Event 3"
              theme="light"
              width="w-full"
              tailwind="justify-start"
              navigateTo="/login"
            />
            <SimpleBtn
              text="Event 4"
              theme="light"
              width="w-full"
              tailwind="justify-start"
              navigateTo="/login"
            />
          </div>

          <SimpleBtn
            icon={<FiSettings />}
            text="Manage events"
            theme="dark"
            width="w-full"
            onClick={() => {
              console.log("Manage events");
            }}
          />
        </div>
      </section>

      <section className="w-full h-full flex flex-col gap-6">
        <section className="w-full h-fit flex flex-row items-center justify-end gap-6 p-4 rounded-3xl border border-solid border-black/[.08]">
          <SimpleBtn
            text=""
            theme="light"
            width="w-12 min-w-12"
            navigateTo="/account"
            backgroundImage="/assets/woman.png"
          />
        </section>

        <section className="w-full h-full flex flex-col gap-6 p-4 rounded-3xl border border-solid border-black/[.08]">
          <section className="mb-4">
            <h3 className="mb-4 flex flex-row items-center gap-2">
              <FiImage className="text-[80%]" />
              My cards
            </h3>

            <section className="flex flex-wrap gap-4">
              <SimpleBtn
                text="Create"
                icon={<FiPlus />}
                theme="light"
                size="w-[158px] h-[158px]"
                tailwind="!rounded-3xl"
                onClick={() => {
                  console.log("Create new card");
                }}
              />
              <SimpleBtn
                text="Card"
                theme="light"
                size="w-[158px] h-[158px]"
                tailwind="!rounded-3xl"
                onClick={() => {
                  console.log("select this card");
                }}
              />
              <SimpleBtn
                text="Card"
                theme="light"
                size="w-[158px] h-[158px]"
                tailwind="!rounded-3xl"
                onClick={() => {
                  console.log("select this card");
                }}
              />
            </section>
          </section>

          <section>
            <h3 className="mb-4 flex flex-row items-center gap-2">
              <FiGrid className="text-[80%]" />
              Explore
            </h3>

            <section className="flex flex-wrap gap-4">
              <SimpleBtn
                text="Card"
                theme="light"
                size="w-[158px] h-[158px]"
                tailwind="!rounded-3xl"
                onClick={() => {
                  console.log("select this card");
                }}
              />
              <SimpleBtn
                text="Card"
                theme="light"
                size="w-[158px] h-[158px]"
                tailwind="!rounded-3xl"
                onClick={() => {
                  console.log("select this card");
                }}
              />
              <SimpleBtn
                text="Card"
                theme="light"
                size="w-[158px] h-[158px]"
                tailwind="!rounded-3xl"
                onClick={() => {
                  console.log("select this card");
                }}
              />
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}
