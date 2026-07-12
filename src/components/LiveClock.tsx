"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [localTime, setLocalTime] = useState("");
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
      setIstTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-1 text-xs uppercase tracking-[0.2em] text-white/50">
      <span>Your Timezone {localTime}</span>
      <span className="text-white/30">India (IST) {istTime}</span>
    </div>
  );
}
