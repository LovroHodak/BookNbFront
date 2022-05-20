import React from "react";

export default function CalendarCell({
  dayOfMonth,
  setDay,
  fromDate,
  toDate,
  year,
  month,
  today,
}) {
  const cell = new Date(`${year}-${month + 1}-${dayOfMonth}`);

  // this is logic for styling
  const isFromDate = cell.getTime() === fromDate?.getTime();
  const isToDate = cell.getTime() === toDate?.getTime();
  const isBetween =
    cell.getTime() > fromDate?.getTime() && cell.getTime() < toDate?.getTime();
  const fromClasses = isFromDate
    ? "bg-accent-400 text-white rounded-l-full"
    : "";
  const toClasses = isToDate ? "bg-accent-400 text-white rounded-r-full" : "";
  const isBetweenClasses = isBetween ? "bg-accent-300 text-white" : "";

  const isBefore = cell.getTime() < today.getTime();
  const isBeforeClasses = isBefore
    ? "text-primary-900 opacity-40 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <td onClick={setDay}>
      <div
        className={`px-2 py-2 flex w-full justify-center ${fromClasses} ${isBetweenClasses} ${toClasses} ${isBeforeClasses}`}
      >
        {dayOfMonth}
      </div>
    </td>
  );
}
