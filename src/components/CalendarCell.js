import React from "react";

export default function CalendarCell({
  dayOfMonth,
  setDay,
  fromDate,
  toDate,
  year,
  month,
  today
}) {
  const cell = new Date(`${year}-${month + 1}-${dayOfMonth}`);

  const isFromDate = cell.getTime() === fromDate?.getTime();
  const isToDate = cell.getTime() === toDate?.getTime();
  const isBetween =
    cell.getTime() > fromDate?.getTime() && cell.getTime() <= toDate?.getTime();

  const fromClasses = isFromDate
    ? "bg-indigo-700 text-white rounded-l-full"
    : "";
  const toClasses = isToDate ? "bg-indigo-700 text-white rounded-r-full" : "";
  const isBetweenClasses = isBetween ? "bg-indigo-500 text-white" : "";

  

  const isBefore = cell.getTime() < today.getTime();
  //console.log(isBefore)
  const isBeforeClasses = isBefore ? "text-white cursor-not-allowed"
  : "cursor-pointer";
  return (
    <td onClick={setDay}>
      <div
        className={`px-2 py-2 flex w-full justify-center ${fromClasses} ${toClasses} ${isBetweenClasses} ${isBeforeClasses}`}
      >
        {dayOfMonth}
      </div>
    </td>
  );
}


