// components/UI/MasonryLayout/MasonryLayout.jsx
"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import "./MasonryLayout.css";

export default function MasonryLayout({
  items = [],
  calculateColumns,
  renderItem,
  columnGap,
  getItemHeight,
  defaultItemHeight = 180,
  containerClassName = "",
  columnClassName = "",
  itemClassName = "",
  tailwindStyle = "",
}) {
  const containerRef = useRef(null);

  // Make the initial columns deterministic so server and client markup match.
  // Using 1 avoids depending on `window` on first render.
  const [columns, setColumns] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [colGap, setColGap] = useState(12);

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    setContainerWidth(w);

    try {
      const cols =
        typeof calculateColumns === "function" ? calculateColumns() : columns;
      // ensure at least 1
      setColumns(Math.max(1, Math.floor(cols)));
    } catch {
      // ignore
    }
  }, [calculateColumns, columns]);

  const handleColGap = useCallback(() => {
    try {
      const gap = typeof columnGap === "function" ? columnGap() : colGap;
      setColGap(gap);
    } catch {}
  }, [columnGap, columns]);

  useEffect(() => {
    handleResize();
    handleColGap();
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleColGap);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleColGap);
    };
  }, [handleResize, handleColGap]);

  const columnWidth = useMemo(() => {
    if (!containerWidth || columns <= 0) return 0;
    return (containerWidth - colGap * (columns - 1)) / columns;
  }, [containerWidth, columns, colGap]);

  const columnsArray = useMemo(() => {
    const cols = Math.max(columns || 1, 1);
    const columnArrays = Array.from({ length: cols }, () => []);

    const canComputeHeights =
      typeof getItemHeight === "function" && columnWidth > 0;

    if (canComputeHeights) {
      const heights = new Array(cols).fill(0);
      items.forEach((item, idx) => {
        // guard getItemHeight so it doesn't throw and keep deterministic fallback
        let height = defaultItemHeight;
        try {
          const h = getItemHeight(item, columnWidth);
          if (typeof h === "number" && isFinite(h) && h > 0) height = h;
        } catch (e) {
          height = defaultItemHeight;
        }
        const shortestIndex = heights.indexOf(Math.min(...heights));
        columnArrays[shortestIndex].push({ item, idx, computedHeight: height });
        heights[shortestIndex] += height + colGap;
      });
    } else {
      items.forEach((item, idx) => {
        const columnIndex = idx % cols;
        columnArrays[columnIndex].push({ item, idx });
      });
    }

    return columnArrays;
  }, [items, columns, columnWidth, getItemHeight, defaultItemHeight, colGap]);

  return (
    <div
      ref={containerRef}
      className={`masonry ${containerClassName}`}
      // use numeric style for gap (keeps render stable)
      style={{ gap: colGap }}
    >
      {columnsArray.map((colItems, colIndex) => (
        <div
          key={colIndex}
          style={{ gap: colGap }}
          className={`masonry-column ${columnClassName}`}
        >
          {colItems.map(({ item, idx, computedHeight }) => {
            // Prefer stable item key
            const stableKey =
              item && (item.id ?? item.key ?? `${colIndex}-${idx}`);
            const style = computedHeight
              ? { height: `${Math.round(computedHeight)}px` }
              : undefined;
            return (
              <div
                key={stableKey}
                className={`masonry-item ${itemClassName} ${tailwindStyle}`}
                style={style}
              >
                {renderItem(item, idx)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
