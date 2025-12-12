"use client"
import { useEffect, useState } from "react";

export const UseCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!currentTime) {
        return {
            currentTime: null,
            hh: "00", mm: "00", ss: "00", dd: "00", month: "00", yy: "00",
            formattedTime: "",
            formattedDate: "",
        };
    }

    const hh = currentTime.getHours().toString().padStart(2, "0");
    const mm = currentTime.getMinutes().toString().padStart(2, "0");
    const ss = currentTime.getSeconds().toString().padStart(2, "0");
    const dd = currentTime.getDate().toString().padStart(2, "0");
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const yy = currentTime.getFullYear().toString();

    return {
        currentTime,
        hh,
        mm,
        ss,
        dd,
        month,
        yy,
        formattedTime: `${hh}:${mm}`,
        formattedDate: `${dd}/${month}/${yy}`,
    };
}