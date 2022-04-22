export function getMonthName(month) {
  // month = 2, (Calendar.js line 11)
  const date = new Date(); // Tue Mar 08 2022 17:54:47 GMT+0100 (Central European Standard Time)
  date.setMonth(month); // date.setMonth(2) - tako spreminjas mesece v date
  // 1646760300875

  // undefined vzame od browserja jezik
  return Intl.DateTimeFormat(undefined, {
    month: "long",
  }).format(date);
  // March
}

// pass Number of day (0-6, Sunday - Saturday) and get back String/name of Day
// getDayName(0) = Monday (MO - because slice)
export function getDayName(indexNr) {
  const date = new Date();
  // Tue Mar 08 2022 17:54:47 GMT+0100 (Central European Standard Time)

  // sett-aj datum na tisto stevilko kjer je nedelja
  date.setDate(indexNr - date.getDay() + date.getDate());
  // indexNr = loop 0-6
  // date.getDay() = 2 (ker je torek)
  // date.getDate() = 8 (ker smo 8ga)
  // prvi date.setDate(0 - 2 + 8) = 6. Najdi nedeljo! Nedelja je 6.3 zato je rezultat 6!!

  // undefined vzame od browserja jezik
  return Intl.DateTimeFormat(undefined, { weekday: "short" })
    .format(date)
    .slice(0, 2);
  // Su
}

