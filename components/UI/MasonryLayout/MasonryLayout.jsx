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

/**
 * Props:
 * - items: Array<any>
 * - calculateColumns: () => number     // called to determine column count (responsive)
 * - renderItem: (item, index) => JSX   // required: returns JSX for each item (must include key)
 * - gap: number (px)                   // optional, default 10
 * - getItemHeight: (item, columnWidth) => number (px) // optional, used for shortest-column placement
 * - defaultItemHeight: number (px)     // fallback height if getItemHeight not provided (default 180)
 * - containerClassName / columnClassName / itemClassName: optional class names
 */
export default function MasonryLayout({
  items = [],
  calculateColumns,
  renderItem,
  gap = 10,
  getItemHeight,
  defaultItemHeight = 180,
  containerClassName = "",
  columnClassName = "",
  itemClassName = "",
  tailwindStyle = "",
}) {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(() => {
    try {
      return typeof calculateColumns === "function" ? calculateColumns() : 4;
    } catch {
      return 4;
    }
  });
  const [containerWidth, setContainerWidth] = useState(0);

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    setContainerWidth(w);
    try {
      const cols =
        typeof calculateColumns === "function" ? calculateColumns() : columns;
      setColumns(cols);
    } catch {
      // ignore
    }
  }, [calculateColumns]);

  useEffect(() => {
    // initial measurements on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Calculate column width
  const columnWidth = useMemo(() => {
    if (!containerWidth || columns <= 0) return 0;
    return (containerWidth - gap * (columns - 1)) / columns;
  }, [containerWidth, columns, gap]);

  // Organize items into columns using shortest column algorithm when possible,
  // otherwise fallback to simple round-robin.
  const columnsArray = useMemo(() => {
    const cols = Math.max(columns || 1, 1);
    const columnArrays = Array.from({ length: cols }, () => []);
    // if we can compute heights, use shortest-column placement
    const canComputeHeights =
      typeof getItemHeight === "function" && columnWidth > 0;

    if (canComputeHeights) {
      const heights = new Array(cols).fill(0);
      items.forEach((item, idx) => {
        const height = getItemHeight(item, columnWidth) || defaultItemHeight;
        const shortestIndex = heights.indexOf(Math.min(...heights));
        columnArrays[shortestIndex].push({ item, idx, computedHeight: height });
        heights[shortestIndex] += height + gap;
      });
    } else {
      // simple round robin (keeps markup stable and predictable)
      items.forEach((item, idx) => {
        const columnIndex = idx % cols;
        columnArrays[columnIndex].push({ item, idx });
      });
    }

    return columnArrays;
  }, [items, columns, columnWidth, getItemHeight, defaultItemHeight, gap]);

  return (
    <div
      ref={containerRef}
      className={`masonry ${containerClassName}`}
      style={{ gap: `${gap}px` }}
      data-columns={columns}
    >
      {columnsArray.map((colItems, colIndex) => (
        <div key={colIndex} className={`masonry-column ${columnClassName}`}>
          {colItems.map(({ item, idx, computedHeight }) => (
            <div
              key={item?.cardId ?? item?.id ?? idx}
              className={`masonry-item ${itemClassName} ${tailwindStyle}`}
              style={
                computedHeight ? { height: `${computedHeight}px` } : undefined
              }
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
