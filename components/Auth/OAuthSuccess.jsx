// components/Auth/Success/OAuthSuccess.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { storeTokenAndProfile, attachTokenToAxios } from "../../utils/authClient";
import { invitease_api } from "../../configs/axiosConfig";

export default function OAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    // token expected in hash fragment: #token=xxxxx
    const hash = window.location.hash || "";
    const m = hash.match(/token=([^&]+)/);
    const token = m && m[1] ? decodeURIComponent(m[1]) : null;
    if (!token) {
      // if not present, try query param too (fallback)
      const urlParams = new URLSearchParams(window.location.search);
      const qtoken = urlParams.get("token");
      if (qtoken) {
        storeTokenAndProfile(qtoken, null);
        attachTokenToAxios();
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      return;
    }

    (async () => {
      try {
        storeTokenAndProfile(token, null); // store token first
        attachTokenToAxios();
        // fetch profile
        const resp = await invitease_api.get("/auth/profile");
        if (resp?.data?.ok && resp.data.user) {
          storeTokenAndProfile(token, resp.data.user);
        }
      } catch (err) {
        console.warn("Could not fetch profile after OAuth:", err?.response?.data || err.message);
      } finally {
        router.push("/dashboard");
      }
    })();
  }, [router]);

  return <div style={{ padding: 24 }}>Signing you in…</div>;
}
