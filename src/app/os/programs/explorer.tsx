"use client";

import { useWindowStore } from "@/store/useWindowStore";
import React, { useEffect, useState } from "react";
import Window from "../../components/window";
import type { WindowInstance, FsNode } from "@/app/utils/interfaces";

// costruisce lo stack di cartelle seguendo un percorso di nomi dalla radice
function resolvePath(root: FsNode, path: string[]): FsNode[] {
    const stack: FsNode[] = [root];
    let current = root;
    for (const name of path) {
        const next = current.children?.find((c) => c.name === name);
        if (!next) break;
        stack.push(next);
        current = next;
    }
    return stack;
}

const Explorer = ({ instance }: { instance: WindowInstance }) => {
    const { toggleWindow } = useWindowStore();
    const [tree, setTree] = useState<FsNode | null>(null);
    const [stack, setStack] = useState<FsNode[]>([]);

    // Load the system tree only once
    useEffect(() => {
        fetch("/os/fileSystem.json")
            .then((r) => r.json())
            .then((root: FsNode) => setTree(root))
            .catch((err) => console.error("Errore fileSystem:", err));
    }, []);

    // Position the stack when the system tree is ready or payload changes
    useEffect(() => {
        if (!tree) return;
        const path = (instance.payload?.path as string[]) ?? [];
        setStack(resolvePath(tree, path));
    }, [tree, instance.payload]);

    const current = stack[stack.length - 1];
    const items = current?.children ?? [];

    const open = (node: FsNode) => {
        if (node.children) setStack((s) => [...s, node]);
        else if (node.appId) toggleWindow(node.appId);
    };
    const goTo = (i: number) => setStack((s) => s.slice(0, i + 1));
    const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

    return (
        <Window id={instance.instanceId} title={current?.name ?? "Explorer"} icon={instance.icon}
            width="780px" height="520px" minWidth="480px" minHeight="320px">
            <div className="flex flex-col h-full text-black text-sm">

                {/* Navbar */}
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gradient-to-b from-[#f7fbff] to-[#dfeaf6] border-b border-[#b9cbdd]">
                    <button onClick={back} disabled={stack.length <= 1}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-base leading-none
                                   bg-gradient-to-b from-[#66a9e0] to-[#2f6fb0] shadow-[0_1px_1px_rgba(0,0,0,.3)]
                                   disabled:opacity-40 disabled:cursor-default cursor-pointer hover:brightness-110 transition-all">
                        <img src="/icons/shell/back.png" alt="<" />
                    </button>

                    {/* Address bar */}
                    <div className="flex-1 flex items-center bg-white border border-[#9db8d2] rounded-[2px] px-2 py-1 overflow-hidden">
                        <img src="/icons/programs/explorer.ico" className="w-4 h-4 mr-1.5" alt="" />
                        {stack.map((f, i) => (
                            <span key={i} className="flex items-center whitespace-nowrap">
                                <button onClick={() => goTo(i)}
                                    className="px-1 rounded-[2px] hover:bg-[#e5f1fb] cursor-pointer">{f.name}</button>
                                {i < stack.length - 1 && <span className="text-[#6b7d8f] px-0.5">▸</span>}
                            </span>
                        ))}
                    </div>
                </div>

                {/* body */}
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-44 shrink-0 bg-[#eef3f9] border-r border-[#d3deea] overflow-auto py-2">
                        <div className="px-3 py-1 text-[11px] font-semibold text-[#5a6a7a] uppercase tracking-wide">Quick Access</div>
                        {tree?.children?.map((f, i) => (
                            <button key={i} onDoubleClick={() => tree && setStack(resolvePath(tree, [f.name]))}
                                className="w-full text-left px-4 py-1 flex items-center gap-2 hover:bg-[#e5f1fb] cursor-pointer">
                                {f.icon && <img src={f.icon} className="w-4 h-4" alt="" />}
                                <span className="truncate">{f.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 bg-white overflow-auto p-3">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-1 content-start">
                            {items.map((n, i) => (
                                <button key={i} onDoubleClick={() => open(n)}
                                    className="flex flex-col items-center gap-1 p-2 rounded border border-transparent
                                               transition-all hover:bg-[#e5f1fb] hover:border-[#cbe6f7] cursor-pointer">
                                    {n.icon && <img src={n.icon} className="w-12 h-12 object-contain" alt="" />}
                                    <span className="text-xs text-center leading-tight">{n.name}</span>
                                </button>
                            ))}
                            {items.length === 0 && (
                                <div className="col-span-full text-[#8a97a5] p-6 text-center">This folder is empty.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status bar */}
                <div className="px-3 py-1 bg-gradient-to-b from-[#f2f6fa] to-[#e6edf5] border-t border-[#d3deea] text-[12px] text-[#5a6a7a]">
                    {items.length} element{items.length === 1 ? "" : "s"}
                </div>
            </div>
        </Window>
    );
};

export default Explorer;