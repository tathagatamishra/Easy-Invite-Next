// components/Auth/AttachAuthClient.jsx
"use client";
import { useEffect } from "react";
import { attachTokenToAxios } from "../../utils/authClient"; // adjust path if needed

export default function AttachAuthClient() {
  useEffect(() => {
    attachTokenToAxios();
  }, []);

  return null;
}
