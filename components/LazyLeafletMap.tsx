"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MapNode } from "@/components/WorldMap";

const LeafletMap = dynamic(
  () => import("@/components/LeafletMap").then((module) => module.LeafletMap),
  { ssr: false }
);

type LoadState = "idle" | "ready" | "error";

export function LazyLeafletMap({ variant = "full" }: { variant?: "full" | "compact" }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(variant === "full");
  const [state, setState] = useState<LoadState>("idle");
  const [nodes, setNodes] = useState<MapNode[]>([]);

  useEffect(() => {
    if (shouldLoad || variant === "full" || !stageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "320px" }
    );

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [shouldLoad, variant]);

  useEffect(() => {
    if (!shouldLoad || state !== "idle") return;

    const controller = new AbortController();
    fetch("/map-nodes.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Map data request failed with ${response.status}`);
        return response.json() as Promise<MapNode[]>;
      })
      .then((data) => {
        setNodes(data);
        setState("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState("error");
      });

    return () => controller.abort();
  }, [shouldLoad, state]);

  const retry = useCallback(() => {
    setNodes([]);
    setState("idle");
    setShouldLoad(true);
  }, []);

  if (state === "ready") return <LeafletMap nodes={nodes} variant={variant} />;

  return (
    <div
      ref={stageRef}
      className={`deferred-map-stage${variant === "compact" ? " compact" : ""}`}
      aria-busy={shouldLoad && state !== "error"}
      aria-label="Interactive BCI world map"
    >
      <div className="deferred-map-grid" aria-hidden="true" />
      <div className="deferred-map-message">
        <span className="eyebrow">Global field</span>
        <b>{shouldLoad ? "Loading interactive map…" : "Interactive map loads as it approaches the viewport"}</b>
        <p>The full 1,064-organization dataset is fetched separately so it never delays the first page view.</p>
        {state === "error" ? (
          <button className="btn btn-primary btn-sm" onClick={retry} type="button">Retry map</button>
        ) : null}
      </div>
    </div>
  );
}
