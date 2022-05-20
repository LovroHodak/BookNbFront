import React from "react";
import Calendar from "./Calendar";

export default function Aside({
  city,
  setCity,
  setDateObj,
  setCallQuery,
  addTab,
  dateObj,
  setHideSearch,
  hideSearch,
  tabs,
}) {
  return (
    <div
      className={`md:w-[340px] grow-0 bg-secondary-500 md:mx-auto md:border-x-2 border-secondary-900 ${
        hideSearch ? "hidden md:block" : ""
      }`}
    >
      <div className="flex items-center p-2.5 mt-1 mx-1">
        <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-primary-500 text-white"></i>
        <h1 className="font-bold text-primary-900 text-[15px] ml-3">BookNB</h1>
        <div className="grow"></div>
        {/* only show hidesearch in smallview and if there are any tabs */}
        {tabs.length > 0 && (
          <button
            onClick={() => setHideSearch(true)}
            className="border-2 border-black rounded md:hidden"
          >
            <i className="bi bi-x text-primary-900 "></i>
          </button>
        )}
      </div>

      <div className="my-2 bg-secondary-900 h-[1px]"></div>

      <div>
        <div className="relative mx-2">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Search"
            className="px-8 py-2 text-[15px] w-full bg-transparent placeholder-white opacity-70 rounded-xl"
          />

          <i className="bi bi-search text-sm absolute left-2.5 top-2.5 text-primary-900"></i>
          {/* SEARCH BUTTON!!! */}
          <button
            onClick={() => {
              addTab();
              setCallQuery(true);
              setCity("");
            }}
            className=" ml-2 disabled:opacity-50 absolute right-2.5 top-2"
            /* you can only press it when those conditions are met */
            disabled={!city || !dateObj.fromDay || !dateObj.toDay}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="my-2 bg-secondary-900 h-[1px]"></div>

      <Calendar setDateObj={setDateObj} />
    </div>
  );
}
