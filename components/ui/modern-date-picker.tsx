"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ModernDatePickerProps = {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  minDate?: string; // YYYY-MM-DD
  error?: string;
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function parseISODate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-").map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return null;
}

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatDisplayDate(dateStr: string): string {
  const d = parseISODate(dateStr);
  if (!d) return "";
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ModernDatePicker({
  value,
  onChange,
  minDate,
  error,
}: ModernDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialDate = useMemo(() => {
    return parseISODate(value) || parseISODate(minDate || "") || new Date();
  }, [value, minDate]);

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-indexed

  // Keep view in sync when value changes externally
  useEffect(() => {
    if (value) {
      const parsed = parseISODate(value);
      if (parsed) {
        setViewYear(parsed.getFullYear());
        setViewMonth(parsed.getMonth());
      }
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const minDateObj = useMemo(() => {
    if (!minDate) return today;
    const parsed = parseISODate(minDate);
    return parsed || today;
  }, [minDate, today]);

  // Navigation handlers
  const canGoPrev = useMemo(() => {
    const firstOfCurrentView = new Date(viewYear, viewMonth, 1);
    const firstOfMinDate = new Date(minDateObj.getFullYear(), minDateObj.getMonth(), 1);
    return firstOfCurrentView > firstOfMinDate;
  }, [viewYear, viewMonth, minDateObj]);

  function handlePrevMonth() {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleSelectToday() {
    const todayStr = toISODate(today);
    onChange(todayStr);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setIsOpen(false);
  }

  // Days in current view month
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const totalDays = lastDay.getDate();

    // 0: Sun, 1: Mon, ... 6: Sat -> convert to 0: Mon, 6: Sun
    const startingDayIndex = (firstDay.getDay() + 6) % 7;

    const days: Array<{
      dayNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isDisabled: boolean;
      isTuesday: boolean;
      isSunday: boolean;
      isToday: boolean;
      isSelected: boolean;
    }> = [];

    // Preceding padding days from previous month
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      const prevD = prevMonthLastDay - i;
      const prevDate = new Date(viewYear, viewMonth - 1, prevD);
      const iso = toISODate(prevDate);
      days.push({
        dayNumber: prevD,
        dateStr: iso,
        isCurrentMonth: false,
        isDisabled: true,
        isTuesday: prevDate.getDay() === 2,
        isSunday: prevDate.getDay() === 0,
        isToday: false,
        isSelected: false,
      });
    }

    // Days of current month
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(viewYear, viewMonth, d);
      const iso = toISODate(dateObj);
      const isTuesday = dateObj.getDay() === 2;
      const isSunday = dateObj.getDay() === 0;
      const isPast = dateObj < minDateObj;
      const isDisabled = isPast || isTuesday; // Tuesday clinic closed
      const isTodayDate = dateObj.getTime() === today.getTime();
      const isSelected = iso === value;

      days.push({
        dayNumber: d,
        dateStr: iso,
        isCurrentMonth: true,
        isDisabled,
        isTuesday,
        isSunday,
        isToday: isTodayDate,
        isSelected,
      });
    }

    // Trailing padding days to fill 35 or 42 grid slots
    const remainingSlots = 42 - days.length;
    if (remainingSlots > 0 && remainingSlots < 7) {
      for (let nextD = 1; nextD <= remainingSlots; nextD++) {
        const nextDate = new Date(viewYear, viewMonth + 1, nextD);
        const iso = toISODate(nextDate);
        days.push({
          dayNumber: nextD,
          dateStr: iso,
          isCurrentMonth: false,
          isDisabled: true,
          isTuesday: nextDate.getDay() === 2,
          isSunday: nextDate.getDay() === 0,
          isToday: false,
          isSelected: false,
        });
      }
    }

    return days;
  }, [viewYear, viewMonth, minDateObj, today, value]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button Input */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Select appointment date"
        className={`w-full flex items-center justify-between rounded-2xl border bg-[#FAF8F5]/85 dark:bg-[#141A16] px-4 py-3.5 text-sm outline-none transition-all duration-300 min-h-[48px] cursor-pointer text-left ${
          isOpen
            ? "border-[#0E7C7B] dark:border-[#E5C583] bg-white dark:bg-[#1C2420] ring-4 ring-[#C5A059]/10 shadow-md"
            : "border-[#E8E1D5] dark:border-[#C5A059]/30 hover:border-[#D5CCBE] dark:hover:border-[#E5C583]/60 focus:border-[#0E7C7B] dark:focus:border-[#E5C583]"
        } ${error ? "border-red-500/80" : ""}`}
      >
        <span
          className={`font-light truncate ${
            value
              ? "text-[#14221B] dark:text-[#FAF8F5] font-medium"
              : "text-[#7A8A80] dark:text-[#7A8A80]"
          }`}
        >
          {value ? formatDisplayDate(value) : "Select consultation date..."}
        </span>

        <div className="flex items-center gap-2 shrink-0 text-[#7A8A80] dark:text-[#E5C583]">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="p-1 hover:text-red-500 transition-colors"
              title="Clear date"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <CalendarIcon className="h-4 w-4 transition-transform duration-300" />
        </div>
      </button>

      {/* Floating Modern Luxury Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-2.5 z-50 w-full sm:w-[350px] rounded-[2rem] border border-[#14221B]/15 dark:border-[#C5A059]/40 bg-[#FAF8F5]/98 dark:bg-[#0E1310]/98 p-5 shadow-[0_25px_70px_rgba(20,34,27,0.18)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* Header: Month / Year Navigation */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#14221B]/10 dark:border-[#C5A059]/20">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canGoPrev}
                aria-label="Previous Month"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                  canGoPrev
                    ? "border-[#14221B]/15 dark:border-white/15 hover:bg-[#14221B] hover:text-[#FAF8F5] dark:hover:bg-[#E5C583] dark:hover:text-[#14221B] cursor-pointer"
                    : "border-transparent opacity-30 cursor-not-allowed text-[#7A8A80]"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="text-center">
                <span className="font-serif text-base sm:text-lg font-normal text-[#14221B] dark:text-[#FAF8F5]">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#14221B]/15 dark:border-white/15 hover:bg-[#14221B] hover:text-[#FAF8F5] dark:hover:bg-[#E5C583] dark:hover:text-[#14221B] transition-all cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mt-3.5 mb-1.5 text-center">
              {DAY_LABELS.map((day, idx) => (
                <span
                  key={day}
                  className={`text-[11px] font-semibold uppercase tracking-wider py-1 ${
                    idx === 1
                      ? "text-red-400/80 dark:text-red-400/60" // Tuesday
                      : idx === 6
                      ? "text-[#C5A059] dark:text-[#E5C583]" // Sunday
                      : "text-[#7A8A80] dark:text-[#A3ACA7]"
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map((cell, idx) => {
                if (!cell.isCurrentMonth) {
                  return (
                    <div
                      key={`pad-${idx}`}
                      className="h-9 flex items-center justify-center text-xs text-[#7A8A80]/30 dark:text-white/10 select-none"
                    >
                      {cell.dayNumber}
                    </div>
                  );
                }

                if (cell.isDisabled) {
                  return (
                    <div
                      key={cell.dateStr}
                      className="relative h-9 flex flex-col items-center justify-center rounded-xl text-xs text-[#7A8A80]/40 dark:text-white/20 select-none cursor-not-allowed bg-black/[0.02] dark:bg-white/[0.02]"
                      title={cell.isTuesday ? "Clinic closed on Tuesdays" : "Past date unavailable"}
                    >
                      <span className={cell.isTuesday ? "line-through opacity-60" : ""}>
                        {cell.dayNumber}
                      </span>
                      {cell.isTuesday && (
                        <span className="text-[7.5px] uppercase tracking-tight text-red-400/70 -mt-1 scale-90">
                          Off
                        </span>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={cell.dateStr}
                    type="button"
                    onClick={() => {
                      onChange(cell.dateStr);
                      setIsOpen(false);
                    }}
                    className={`relative h-9 flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      cell.isSelected
                        ? "bg-[#14221B] dark:bg-[#18201C] text-[#FAF8F5] dark:text-[#E5C583] shadow-md shadow-[#14221B]/20 scale-[1.04] border border-[#14221B] dark:border-[#C5A059]"
                        : cell.isToday
                        ? "border border-[#C5A059] text-[#14221B] dark:text-[#FAF8F5] bg-[#C5A059]/10 hover:bg-[#C5A059]/20"
                        : "text-[#14221B] dark:text-[#FAF8F5] hover:bg-[#14221B]/8 dark:hover:bg-white/10 hover:scale-105"
                    }`}
                  >
                    <span>{cell.dayNumber}</span>
                    {cell.isSunday && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#C5A059]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Quick Shortcuts & Legend */}
            <div className="mt-4 pt-3 border-t border-[#14221B]/10 dark:border-[#C5A059]/20 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-3 text-[#7A8A80] dark:text-[#A3ACA7]">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                  <span>Sunday OPD</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                  <span>Tue Off</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleSelectToday}
                disabled={today.getDay() === 2}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#14221B] dark:text-[#E5C583] hover:underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-3 w-3 text-[#C5A059]" />
                <span>Today</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
