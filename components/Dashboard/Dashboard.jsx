// components/Dashboard/Dashboard.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SimpleBtn from "../UI/Buttons/SimpleBtn";
import { useRouter } from "next/navigation";
import "./Dashboard.css";
import {
  FiPlus,
  FiSettings,
  FiGrid,
  FiImage,
  FiBell,
  FiUserPlus,
  FiMenu,
} from "react-icons/fi";
import invitationCardsData from "../../data/invitationCards.json";
import userCardsData from "../../data/userCards.json";
import MasonryLayout from "../UI/MasonryLayout/MasonryLayout";
import SimpleCard from "../UI/Cards/SimpleCard";
import { LuCalendarDays } from "react-icons/lu";
import { LuBell } from "react-icons/lu";

export default function Dashboard() {
  const router = useRouter();
  const [invitationCards, setInvitationCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [maxCards, setMaxCards] = useState(8);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const calculateMaxCards = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 640) return 4;
      if (width <= 810) return 6;
      if (width <= 1080) return 8;
      return 10;
    }
    return 6;
  }, []);

  const calculateColumns = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 640) return 2;
      if (width <= 810) return 3;
      if (width <= 1080) return 4;
      return 5;
    }
    return 3;
  }, []);

  const calculateColGap = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 640) return 8;
      if (width <= 810) return 12;
      if (width <= 1080) return 16;
      return 18;
    }
    return 12;
  }, []);

  useEffect(() => {
    setInvitationCards(invitationCardsData.invitationCards);
    setUserCards(userCardsData.userCards);
  }, []);

  useEffect(() => {
    // Set initial max cards
    setMaxCards(calculateMaxCards());
    // Update on resize
    const handleResize = () => {
      setMaxCards(calculateMaxCards());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateMaxCards]);
  const displayedCards = userCards.slice(0, maxCards - 1);

  const navigate = (page) => {
    router.push(page);
  };

  return (
    <main className="relative flex min-h-full w-full max-w-[1080px] flex-row items-center lg:gap-6 md:gap-4 gap-2">
      <section
        className={`sidebar h-full flex flex-col items-center justify-between lg:py-4 py-3 rounded-xl sm:rounded-3xl border border-solid border-black/[.08] overflow-hidden ${
          isSidebarOpen ? "sidebar-open shadow-md" : ""
        }`}
      >
        <Image
          className="mb-10"
          src="/text-1764000615754.png"
          alt="Next.js logo"
          width={120}
          height={20}
          priority
          onClick={() => {
            navigate("/dashboard");
          }}
        />
        <div className="px-4 pb-4 w-full">
          <SimpleBtn
            icon={<FiPlus />}
            text="New event"
            theme="dark"
            width="w-full"
            tailwind=""
            onClick={() => {
              console.log("create new event");
            }}
          />
        </div>

        <div className="shadowDiv-t w-full h-2 min-h-2 z-2"></div>
        <div className="w-full h-full flex flex-col md:gap-4 gap-2 lg:px-4 px-3 lg:py-4 py-3 overflow-y-auto z-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <SimpleBtn
              key={index}
              text={"Event " + (index + 1)}
              theme="light"
              width="w-full"
              tailwind="justify-start"
              navigateTo="/login"
            />
          ))}
        </div>
        <div className="shadowDiv-b w-full h-2 min-h-2 z-2"></div>

        <div className="px-4 pt-4 w-full">
          <SimpleBtn
            icon={<FiSettings />}
            text="Manage events"
            theme="dark"
            width="w-full"
            tailwind=""
            onClick={() => {
              console.log("Manage events");
            }}
          />
        </div>
      </section>

      {isSidebarOpen && (
        <div
          className={`bgBlur fixed inset-0 md:hidden z-25 ${
            isSidebarOpen ? "sidebar-open" : ""
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <section className="w-full h-full flex flex-col lg:gap-6 md:gap-4 gap-2">
        <section className="topbar w-full h-fit flex flex-row items-center justify-between md:gap-4 gap-2 lg:p-4 md:p-3 p-2 rounded-xl sm:rounded-3xl border border-solid border-black/[.08]">
          <SimpleBtn
            text=""
            theme="light"
            width="lg:w-12 lg:min-w-12 md:w-10 md:min-w-10 w-8 min-w-8"
            padding="px-0 lg:px-5 md:px-3"
            tailwind="md:hidden "
            textStyle="hidden"
            icon={<FiMenu />}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          />

          <div className="w-full h-fit flex flex-row items-center justify-end gap-4">
            <SimpleBtn
              text="Calender"
              theme="light"
              height="lg:h-12 lg:min-h-12 md:h-10 md:min-h-10 h-8 min-h-8"
              width="lg:w-[158px] lg:min-w-[158px] md:w-fit md:min-w-fit w-8 min-w-8"
              padding="px-0 lg:px-5 md:px-3"
              notify={true}
              textStyle="hidden md:block"
              icon={<LuCalendarDays />}
            />
            <SimpleBtn
              text="Notification"
              theme="light"
              height="lg:h-12 lg:min-h-12 md:h-10 md:min-h-10 h-8 min-h-8"
              width="lg:w-[158px] lg:min-w-[158px] md:w-fit md:min-w-fit w-8 min-w-8"
              padding="px-0 lg:px-5 md:px-3"
              notify={true}
              textStyle="hidden md:block"
              icon={<FiBell />}
            />
            <SimpleBtn
              text="Contact"
              theme="light"
              height="lg:h-12 lg:min-h-12 md:h-10 md:min-h-10 h-8 min-h-8"
              width="lg:w-[158px] lg:min-w-[158px] md:w-fit md:min-w-fit w-8 min-w-8"
              padding="px-0 lg:px-5 md:px-3"
              textStyle="hidden md:block"
              icon={<FiUserPlus />}
            />
            <SimpleBtn
              text=""
              theme="light"
              width="lg:w-12 lg:min-w-12 md:w-10 md:min-w-10 w-8 min-w-8"
              navigateTo="/account"
              backgroundImage="/assets/woman.png"
            />
          </div>
        </section>

        <section className="maingrid w-full h-full flex flex-col rounded-xl sm:rounded-3xl border border-solid border-black/[.08] overflow-hidden">
          <div className="shadowDiv-t w-full h-2 z-[2]"></div>

          <div className="w-full h-full flex flex-col md:gap-6 gap-4 lg:px-4 px-3 py-2 overflow-y-auto z-[1]">
            <section className="mb-4">
              <h3 className="mb-4 flex flex-row items-center gap-2">
                <FiImage className="text-[80%]" />
                My cards
              </h3>

              <section className="myCards grid grid-rows-2 grid-flow-col auto-cols-fr md:gap-4 gap-2">
                <SimpleCard
                  text="Create"
                  icon={<FiPlus />}
                  theme="light"
                  height="h-full aspect-square"
                  width="w-full"
                />
                {displayedCards.map((card, index) => (
                  <SimpleCard
                    key={index}
                    text="Card"
                    theme="light"
                    bgImage={card.imageUrl}
                    height="h-full aspect-square"
                    width="w-full"
                  />
                ))}
              </section>
            </section>

            <section>
              <h3 className="mb-4 flex flex-row items-center gap-2">
                <FiGrid className="text-[80%]" />
                Explore cards
              </h3>

              <MasonryLayout
                items={invitationCards}
                calculateColumns={calculateColumns}
                columnGap={calculateColGap}
                tailwindStyle="cursor-pointer border border-solid border-black/[.08] sm:rounded-2xl rounded-lg"
                renderItem={(card) => (
                  <div
                    onClick={() => {
                      console.log("Selected card:", card);
                    }}
                  >
                    <Image
                      height={480}
                      width={480}
                      src={card.imageUrl}
                      alt={card.cardTitle}
                    />
                  </div>
                )}
              />
            </section>
          </div>

          <div className="shadowDiv-b w-full h-2 z-[2]"></div>
        </section>
      </section>
    </main>
  );
}
