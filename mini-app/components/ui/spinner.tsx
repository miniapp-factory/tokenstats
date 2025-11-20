"use client";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-2 border-gray-200 h-8 w-8 ${className}`}
    />
  );
}
