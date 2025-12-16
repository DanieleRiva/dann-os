"use client"

import { useFlyoutStore } from '@/store/useFlyoutStore';
import React, { useEffect, useRef } from 'react'
import { clsx } from 'clsx';

interface FlyoutProps {
    id: string,
    isOpen: boolean,
    width?: string,
    height?: string,
    className?: string,
    position?: { top?: number, bottom?: number, left?: number, right?: number },
    centerHorizontally?: boolean,
    centerVertically?: boolean,
    children: React.ReactNode
}

const Flyout = ({
    id,
    isOpen,
    width = "300px",
    height = "500px",
    position = { bottom: 64 },
    centerHorizontally = false,
    centerVertically = false,
    className = "rounded-xl",
    children
}: FlyoutProps) => {
    const flyoutRef = useRef<HTMLDivElement>(null);
    const { toggleFlyout, triggerElement } = useFlyoutStore();

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (isOpen && !flyoutRef.current?.contains(e.target as Node) && !triggerElement?.contains(e.target as Node)) {
                toggleFlyout(id);
            }
        }

        window.addEventListener("mousedown", handleOutsideClick);
        return () => window.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen, toggleFlyout]);

    const computeFlyoutPosition = () => {
        const style: React.CSSProperties = {
            width,
            height,
        };

        const transform: string[] = [];

        if (centerHorizontally) {
            style.left = "50%";
            transform.push("translateX(-50%)");
        } else {
            if (position?.left !== undefined) style.left = position.left;
            if (position?.right !== undefined) style.right = position.right;
        }

        if (centerVertically) {
            style.top = "50%";
            transform.push("translateY(-50%)");
        } else {
            if (position?.top) style.top = position.top;
            style.bottom = (position?.bottom ?? 0) + 64;
        }

        style.transform = transform.join(" ");
        return style;
    };

    return (
        <div
            ref={flyoutRef}
            style={computeFlyoutPosition()}
            className={clsx(
                "absolute z-20 transition-all duration-400 ease-out overflow-hidden",
                isOpen ? "max-h-[100vh]" : "max-h-0"
            )}
        >
            <div className="w-full h-full p-3 box-border">
                <div className={clsx("w-full h-full flex flex-col bg-blur aero-shadow overflow-hidden border border-white/30", className)}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Flyout