import { useState, useRef, useCallback } from "react";

export function useDragReorder<T extends { id: string }>(
  items: T[],
  onReorder: (reordered: T[]) => void
) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragNode = useRef<HTMLElement | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLElement>, index: number) => {
      dragNode.current = e.currentTarget;
      setDragIndex(index);
      e.dataTransfer.effectAllowed = "move";
      // Make the drag image slightly transparent
      requestAnimationFrame(() => {
        if (dragNode.current) {
          dragNode.current.style.opacity = "0.4";
        }
      });
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLElement>, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setOverIndex(index);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    if (dragNode.current) {
      dragNode.current.style.opacity = "1";
    }

    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const reordered = [...items];
      const [moved] = reordered.splice(dragIndex, 1);
      reordered.splice(overIndex, 0, moved);
      onReorder(reordered);
    }

    setDragIndex(null);
    setOverIndex(null);
    dragNode.current = null;
  }, [dragIndex, overIndex, items, onReorder]);

  const handleDragLeave = useCallback(() => {
    setOverIndex(null);
  }, []);

  const getDragProps = useCallback(
    (index: number) => ({
      draggable: true,
      onDragStart: (e: React.DragEvent<HTMLElement>) =>
        handleDragStart(e, index),
      onDragOver: (e: React.DragEvent<HTMLElement>) =>
        handleDragOver(e, index),
      onDragEnd: handleDragEnd,
      onDragLeave: handleDragLeave,
    }),
    [handleDragStart, handleDragOver, handleDragEnd, handleDragLeave]
  );

  const getItemStyle = useCallback(
    (index: number): string => {
      if (dragIndex === null || overIndex === null) return "";
      if (index === overIndex && index !== dragIndex) {
        return dragIndex < overIndex
          ? "border-b-2 border-b-[#FF6B00]"
          : "border-t-2 border-t-[#FF6B00]";
      }
      return "";
    },
    [dragIndex, overIndex]
  );

  return { getDragProps, getItemStyle, isDragging: dragIndex !== null };
}
