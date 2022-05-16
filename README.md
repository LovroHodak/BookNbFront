



1. INDEX.js
-added bootstrap
-injected queryClient

2. USEQUERYHOOK.js
-fetch from BE 

3. APP.js
3. 1. useQuery
-key is an Array (key)
-fetching with getData (function)
-additional handlers

3. 2. addTab !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
-THERE WILL BE MORE KEYS THAT IS WHY => SELECTEDKEY
-tabs is an array of objects [{name, key}, {name, key}]
-it is being fired in Aside.js

4. ASIDE.js
-with search button I fire: addTab, setCallQuery(true), setCity(""), but it is enabled until dateObj is not created

5. CALENDAR.js
5. 1. daysNames
-create array of days with helper func getDayName
5. 2. setDay !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-DAYOFMONTH AS ARG IN SETDAY AND AS MAP PROP IN ROW.MAP
-logic that makes sure which dates you can choose and in what order
-it activates onClick in CalendarCell.js
-takes in number as arg
5. 3. monthTable
-is a calender logic and useMemo is used because it needs to be returned immediately
-table starts with sunday so figure out on which day 1 in month is
-by same logic find out which last day is
-get how many days in month and start calculating nr of rows (each row will have 7 days)
5. 3. 1. monthsGrid
-map those rows and fill each row with 7 days
-logic on which day in month(name) each date is(number) 
-returns an array(rows) of arrays(days in week)
-in useEffect setDateObj which is set onClick in CalenderCell

6. DATEFUNCTIONS.js
-getMonthName get months names from date object
-getDayName get days names from date object

7. CALENDERCELL.js
-cell represents each day in month because in Calendar.js (row.map((dayOfMonth,)))
-onClick(setDay)

8. OFFERS.js
8. 1. props !!!!!!!!!!
-airbnb = [], booking = [],
8. 2. mergedQuery 
-useMemo is used because it needs to be returned immediately
8. 3. sortedQuery
-useMemo is used because it needs to be returned immediately
-[...mergedQuery].sort so that initial mergedQuery stays the same
8. 4. 
-isActive when tabs.key === selectedKey
-removeTab() logic how to remove tab and set another to selectedKey
-possible query outcomes













1. npm i react-placeholder-loading --save
2. npm install react-router-dom@5.2.0
3. npm install react-router@5.2.0
4. npm i react-query
5. npm i bootstrap-icons
6. npm install -D tailwindcss postcss autoprefixer

7. npx tailwindcss init
7. /tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
8. /index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

 



 