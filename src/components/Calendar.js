import React, { useEffect, useMemo, useState } from "react";
import CalendarCell from "./CalendarCell";
import { getMonthName, getDayName } from "./DateFunctions";

export default function Calendar({ setDateObj }) {
  const [month, setMonth] = useState(new Date().getMonth());
  // 2 (March, counting starts at 0)
  const [year, setYear] = useState(new Date().getFullYear());

  const daysNames = new Array(7)
    .fill(null)
    .map((_, indexNr) => getDayName(indexNr));
  //['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // move months
  const monthUp = () => {
    if (month === 11) {
      setYear((year) => year + 1);
      setMonth(0);
    } else {
      setMonth((month) => month + 1);
    }
  };

  const monthDown = () => {
    if (month === 0) {
      setYear((year) => year - 1);
      setMonth(11);
    } else {
      setMonth((month) => month - 1);
    }
  };

  // difference between now and today is in time!!
  const now = new Date();
  // Fri Apr 22 2022 17:30:30 GMT+0200 (Central European Summer Time)
  const today = new Date(
    `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  );
  // Fri Apr 22 2022 00:00:00 GMT+0200 (Central European Summer Time)

  // SETDAY
  // SETDAY
  // SETDAY
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromOrTo, setFromOrTo] = useState("from");

  // this is sent to each calendarCell
  // SETDAY takes in number as arg
  const setDay = (dayOfMonth) => {
    const targetDate = new Date(`${year}-${month + 1}-${dayOfMonth}`);
    const targetPlusOneDate = new Date(`${year}-${month + 1}-${dayOfMonth}`);
    targetPlusOneDate.setDate(targetDate.getDate() + 1);
    // logic for setting chosen dates
    if (
      !fromDate ||
      (fromOrTo === "from" && targetDate.getTime() >= fromDate?.getTime())
    ) {
      setFromDate(targetDate);
      setToDate(targetPlusOneDate);
      setFromOrTo("to");
    } else if (
      fromOrTo === "to" &&
      targetDate.getTime() >= fromDate?.getTime()
    ) {
      setToDate(targetDate);
      setFromOrTo("from");
    } else if (
      targetDate.getTime() <= fromDate?.getTime() &&
      targetDate.getTime() >= today.getTime()
    ) {
      setFromDate(targetDate);
      setToDate(targetPlusOneDate);
    }
  };

  // MONTHTABLE
  // MONTHTABLE
  // MONTHTABLE
  // useMemo because we want smt to be returned and effect needs to be fired immediately
  const monthTable = useMemo(() => {
    const firstDay = new Date();
    // Fri Mar 11 2022 16:21:40 GMT+0100 (Central European Standard Time)
    firstDay.setDate(1);
    //Tue Mar 01 2022 16:22:20 GMT+0100 (Central European Standard Time)
    firstDay.setMonth(month);
    firstDay.setFullYear(year);

    const firstDayNumber = firstDay.getDay();
    // 2 (Tuesday)
    const lastDay = new Date(year, month + 1, 0);
    // Thu Mar 31 2022 00:00:00 GMT+0200 (Central European Summer Time)
    const lastDayNumber = lastDay.getDay();
    // 4 (Thursday)
    const howManyDaysInMonth = lastDay.getDate();
    // 31
    const nrOfRows = Math.ceil((firstDayNumber + howManyDaysInMonth) / 7);
    // 5 (March 2022)
    // firstDay(2) + howManyDaysInMonth(31) = 33 / 7 = 4.7
    // Math.ceil(4.7) = 5

    const rowArr = new Array(nrOfRows).fill(null);
    // [null, null, null, null, null]

    let monthsGrid = rowArr.map((_, rowIndex) => {
      // each row has 7 days
      const daysOfColumn = new Array(7).fill(null).map((_, columnIndex) => {
        // FIRST row
        if (rowIndex === 0) {
          // firstDayNumber = 2, col0 empty, col1 empty, now col2 is true that is why number 1
          if (columnIndex >= firstDayNumber) {
            return columnIndex - firstDayNumber + 1;
          }
          return null;
        }
        // LAST row
        // rowIndex starts with 0
        if (rowIndex === nrOfRows - 1) {
          if (columnIndex <= lastDayNumber) {
            // 31 - 4 + 0 = 27
            // 31 - 4 + 1 = 28 ...
            // 31 - 4 + 4 = 31 stop (what is bigger returns null)
            return howManyDaysInMonth - lastDayNumber + columnIndex;
          }
          return null;
        }
        // OTHER rows
        // there aleready exists rule for row=0, so i start with 1
        // (1 * 7) + 1 - (2) + 0 ergo first date in 1row je = 6
        return rowIndex * 7 + 1 - firstDayNumber + columnIndex;
      });
      return daysOfColumn;
    });
    //console.log(monthsGrid);
    // [Array(7), Array(7), Array(7), Array(7), Array(7)]
    return monthsGrid;
  }, [month, year]);

  // USEEFFECT
  // USEEFFECT
  // this gets set after dates are chosen
  useEffect(() => {
    setDateObj({
      fromDay: fromDate?.getDate(),
      fromMonth: fromDate?.getMonth() + 1,
      fromYear: fromDate?.getFullYear(),
      toDay: toDate?.getDate(),
      toMonth: toDate?.getMonth() + 1,
      toYear: toDate?.getFullYear(),
    });
  }, [fromDate, setDateObj, toDate]);

  return (
    <div className="mx-1 mb-8">
      <div className="flex items-center p-2.5">
        <span className="grow">
          {getMonthName(month)} {year}
        </span>
        <div className="">
          <button onClick={monthDown}>
            <i className="bi bi-chevron-left" />
          </button>
          <button onClick={monthUp} className="ml-1.5">
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>

      <div className="">
        <table className="w-full">
          <thead>
            <tr>
              {daysNames.map((day, i) => {
                return (
                  <th key={i}>
                    <div>
                      <p>{day}</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {monthTable.map((row, rowNumber) => {
              return (
                <tr key={rowNumber}>
                  {row.map((dayOfMonth, columnNumber) => {
                    return (
                      <CalendarCell
                        key={columnNumber}
                        dayOfMonth={dayOfMonth}
                        setDay={() => setDay(dayOfMonth)}
                        fromDate={fromDate}
                        toDate={toDate}
                        year={year}
                        month={month}
                        today={today}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
