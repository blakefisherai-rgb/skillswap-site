import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A simple phone shell. The screen area scrolls; children render inside it. */
export function PhoneFrame({
  children,
  className,
  label,
  time = "9:41",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  time?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[300px] max-w-full rounded-[2.75rem] bg-navy p-[10px] shadow-[0_30px_60px_-20px_rgb(16_47_71/0.45)]",
        className,
      )}
      role={label ? "group" : undefined}
      aria-label={label}
    >
      <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[2.2rem] bg-page">
        {/* status bar */}
        <div className="relative flex h-9 shrink-0 items-center justify-between bg-white px-6 text-[11px] font-semibold text-navy">
          <span>{time}</span>
          <span className="absolute top-2 left-1/2 h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-navy" aria-hidden="true" />
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              <span className="h-[4px] w-[3px] rounded-sm bg-navy" />
              <span className="h-[6px] w-[3px] rounded-sm bg-navy" />
              <span className="h-[8px] w-[3px] rounded-sm bg-navy" />
              <span className="h-[10px] w-[3px] rounded-sm bg-navy" />
            </span>
            <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border-[1.5px] border-navy p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-navy" />
            </span>
          </span>
        </div>
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
