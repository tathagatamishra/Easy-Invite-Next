// components/Auth/Login.jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import SimpleBtn from "../UI/Buttons/SimpleBtn";
import { useRouter } from "next/navigation";
import "./AuthStyle.css";
import SimpleInput from "../UI/Inputs/SimpleInput";

import { invitease_api } from "../../configs/axiosConfig";
import {
  storeTokenAndProfile,
  attachTokenToAxios,
} from "../../utils/authClient";

export default function Login() {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const startOAuth = (provider) => {
    const backend = invitease_api.defaults.baseURL;
    window.location.href = `${backend}/auth/${provider}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await invitease_api.post("/auth/login", { email, password });
      if (resp?.data?.ok && resp.data.token) {
        storeTokenAndProfile(resp.data.token, resp.data.user);
        attachTokenToAxios();
        router.push("/dashboard");
      } else {
        alert(resp?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
          text="Sign up"
          theme="light"
          width="w-fit sm:w-[158px] min-w-fit"
          navigateTo="/signup"
        />
      </nav>

      <div className="relative w-full flex flex-row items-center justify-center sm:justify-between gap-6 text-center sm:text-left">
        <div className="w-full flex-col gap-6 sm:flex hidden">
          <h1 className="bg-[#ffffff] flex flex-col text-3xl font-semibold leading-10 tracking-tight z-[2]">
            <span>Welcome</span> <span> back to Invitease.</span>
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-600 z-[2]">
            Log in to pick up right where you left off — your{" "}
            <a href="#" className="font-medium text-zinc-950">
              Templates, Events
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-zinc-950">
              Galleries
            </a>
            are waiting.
          </p>
        </div>

        <div className="form w-full max-w-[538px] p-4 z-[1] flex flex-col items-center gap-[16px] rounded-3xl border border-solid border-black/[.08]">
          <h3 className="mb-4">Log in your account</h3>

          <SimpleBtn
            logo="/google.png"
            text="Continue with Google"
            theme="light"
            width="w-full"
            onClick={() => startOAuth("google")}
          />
          {/* <SimpleBtn
            logo="/meta.png"
            text="Continue with Meta"
            theme="light"
            width="w-full"
            onClick={() => startOAuth("facebook")}
          />
          <SimpleBtn
            logo="/linkedin.png"
            text="Continue with Linkedin"
            theme="light"
            width="w-full"
            onClick={() => startOAuth("linkedin")}
          /> */}

          <div className="relative w-[90%] my-6 flex flex-col items-center justify-center">
            <span className="w-full z-0 border-t border-black/[.08]"></span>
            <span className="absolute z-1 px-2 text-[#666] bg-white">or</span>
          </div>

          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col items-center gap-[16px]"
          >
            <SimpleInput
              id="email"
              label="Email address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <SimpleInput
              id="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <SimpleBtn
              text={loading ? "Logging in..." : "Log in"}
              theme="dark"
              width="w-full"
              type="submit"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
