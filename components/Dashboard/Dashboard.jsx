// components/Dashboard/Dashboard.jsx
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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
  FiLogOut,
} from "react-icons/fi";
import invitationCardsData from "../../data/invitationCards.json";
import userCardsData from "../../data/userCards.json";
import events from "../../data/events.json";
import MasonryLayout from "../UI/MasonryLayout/MasonryLayout";
import SimpleCard from "../UI/Cards/SimpleCard";
import { LuCalendarDays } from "react-icons/lu";
import { logoutUser } from "@/utils/authClient";

export default function Dashboard() {
  const router = useRouter();
  const navigate = (page) => {
    router.push(page);
  };
  const [invitationCards, setInvitationCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [maxCards, setMaxCards] = useState(8);
  const [userEvents, setUserEvents] = useState([]);
  const [maxEvents, setMaxEvents] = useState(9);

  const calculateMaxEvents = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 480) return 6;
      if (width <= 639) return 4;
      if (width <= 768) return 6;
      return 6;
    }
    return 4;
  }, []);

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

  // these are for marketplace cards masonry layout
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
  // ----------------------------------------------

  useEffect(() => {
    setInvitationCards(invitationCardsData.invitationCards);
    setUserCards(userCardsData.userCards);
    setUserEvents(events.events);
  }, []);

  useEffect(() => {
    // Set initial max cards
    setMaxEvents(calculateMaxEvents());
    // Update on resize
    const handleResize = () => {
      setMaxEvents(calculateMaxEvents());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateMaxEvents]);

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

  const displayedEvents = userEvents.slice(0, maxEvents);
  const displayedCards = userCards.slice(0, maxCards - 1);

  const doLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  // horizontal scroll with wheel + drag ---
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleWheel = (e) => {
      // Prevent default vertical scroll
      if (e.deltaY !== 0) {
        e.preventDefault();
        // Convert vertical scroll to horizontal
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = x - startX; // Scroll speed multiplier
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      scrollContainer.addEventListener("mousedown", handleMouseDown);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);
      scrollContainer.addEventListener("mouseup", handleMouseUp);
      scrollContainer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
        scrollContainer.removeEventListener("mousedown", handleMouseDown);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
        scrollContainer.removeEventListener("mouseup", handleMouseUp);
        scrollContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
  // -------------------------

  return (
    <main className="relative flex min-h-full w-full max-w-[1216px] flex-row lg:gap-6 md:gap-4 gap-2">
      <section
        className={`Sidebar h-full hidden md:flex flex-col items-center justify-between lg:py-4 py-3 rounded-xl sm:rounded-3xl border border-solid border-black/[.08] overflow-hidden sm:shadow-none`}
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

        <div className="w-full h-full flex flex-col md:gap-4 gap-2 lg:px-4 px-3 lg:py-4 py-3 overflow-y-auto overflow-x-hidden z-1">
          {userEvents.map((event, index) => (
            <SimpleBtn
              key={index}
              text={event.eventTitle}
              backgroundImage={event.coverImageUrl}
              boxShadow="0px 2px 0px #767676"
              bgImageOpacity="40"
              theme="light"
              width="xs:w-full w-[150px]"
              tailwind="justify-start"
              textStyle="truncate max-w-full"
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

      <section className="w-full h-full flex flex-col lg:gap-6 md:gap-4 gap-3.5">
        <section className="Topbar w-full h-fit flex flex-row items-center justify-between md:gap-4 gap-2 lg:p-4 md:p-3 p-2 rounded-xl sm:rounded-3xl border border-solid border-black/[.08]">

          <div className="w-full h-fit flex flex-row items-center justify-end gap-4">
            <SimpleBtn
              text="Calender"
              theme="light"
              height="lg:h-12 lg:min-h-12 h-10 min-h-10"
              width="lg:w-[158px] lg:min-w-[158px] w-fit min-w-fit"
              padding="px-0 lg:px-5 px-3"
              notify={true}
              textStyle="hidden md:block"
              icon={<LuCalendarDays />}
            />
            <SimpleBtn
              text="Notifications"
              theme="light"
              height="lg:h-12 lg:min-h-12 h-10 min-h-10"
              width="lg:w-[158px] lg:min-w-[158px] w-fit min-w-fit"
              padding="px-0 lg:px-5 px-3"
              notify={true}
              textStyle="hidden md:block"
              icon={<FiBell />}
            />
            <SimpleBtn
              text="Guests"
              theme="light"
              height="lg:h-12 lg:min-h-12 h-10 min-h-10"
              width="lg:w-[158px] lg:min-w-[158px] w-fit min-w-fit"
              padding="px-0 lg:px-5 px-3"
              textStyle="hidden md:block"
              icon={<FiUserPlus />}
            />
            <SimpleBtn
              text=""
              theme="light"
              width="lg:w-12 lg:min-w-12 w-10 min-w-10"
              navigateTo="/account"
              backgroundImage="/assets/woman.png"
            />
          </div>
        </section>

        <section className="Events w-full min-h-fit flex flex-col rounded-xl sm:rounded-3xl border border-solid border-black/[.08] gap-8 overflow-hidden md:hidden">
          <div className="w-full h-fit px-3 pt-4">
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

          <div className="w-full h-fit xs:px-3 px-0  flex flex-row">
            <div className="shadowDiv-t h-full w-2 min-w-2 z-2 xs:hidden flex"></div>

            <div
              ref={scrollContainerRef}
              className="w-full h-fit overflow-hidden overflow-x-auto"
            >
              <div className="h-fit w-fit flex flex-row xs:grid sm:grid-cols-3 grid-cols-2 grid-flow-row auto-rows-fr sm:gap-4 gap-2 xs:px-0 px-2 pb-6">
                {displayedEvents.map((event, index) => (
                  <SimpleBtn
                    key={index}
                    text={event.eventTitle}
                    backgroundImage={event.coverImageUrl}
                    boxShadow="0px 2px 0px #767676"
                    bgImageOpacity="40"
                    theme="light"
                    width="xs:w-full w-[150px]"
                    tailwind="justify-start"
                    textStyle="truncate max-w-full"
                  />
                ))}
              </div>
            </div>

            <div className="shadowDiv-b h-full w-2 min-w-2 z-2 xs:hidden flex"></div>
          </div>
        </section>

        <section className="MyCards w-full min-h-fit flex flex-col rounded-xl sm:rounded-3xl border border-solid border-black/[.08] overflow-hidden">
          <h3 className="lg:px-4 px-3 mt-2 flex flex-row items-center gap-2 z-3">
            <FiImage className="text-[80%]" />
            My cards
          </h3>

          <div className="grid grid-rows-2 grid-flow-col auto-cols-fr md:gap-4 gap-2 md:mb-4 mb-2 lg:px-4 px-3 py-4 z-1">
            <SimpleCard
              text="Create"
              icon={<FiPlus />}
              theme="light"
              height="md:aspect-square"
              width="w-full"
              navigateTo="/test"
            />
            {displayedCards.map((card, index) => (
              <SimpleCard
                key={index}
                text="Card"
                theme="light"
                bgImage={card.imageUrl}
                height="md:aspect-square"
                width="w-full"
              />
            ))}
          </div>
        </section>

        <section className="Marketplace w-full h-full flex flex-col rounded-xl sm:rounded-3xl border border-solid border-black/[.08] overflow-hidden">
          <h3 className="lg:px-4 px-3 mt-2 flex flex-row items-center gap-2 z-3">
            <FiGrid className="text-[80%]" />
            Explore cards
          </h3>

          <div className="shadowDiv-t w-full h-2 z-2"></div>
          <div className="w-full h-full flex flex-col md:gap-6 gap-4 lg:px-4 px-3 py-4 overflow-y-auto z-1">
            <section className="mb-4">
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
