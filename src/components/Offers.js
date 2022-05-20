import React, { useMemo, useState } from "react";

export default function Offers({
  airbnb = [],
  booking = [],
  tabs,
  setSelectedKey,
  setTabs,
  selectedKey,
  query,
  setHideSearch,
  hideSearch,
}) {
  const mergedQuery = useMemo(() => {
    return airbnb.concat(booking).sort((a, b) => {
      return a.price - b.price;
    });
  }, [airbnb, booking]);

  const [sortType, setSortType] = useState("priceUp");

  const sortedQuery = useMemo(() => {
    if (!sortType) {
      return mergedQuery;
    } else if (sortType === "ratingUp") {
      return [...mergedQuery].sort((a, b) => {
        return b.score - a.score;
      });
    } else if (sortType === "ratingDown") {
      return [...mergedQuery].sort((a, b) => {
        return a.score - b.score;
      });
    } else if (sortType === "priceUp") {
      return [...mergedQuery].sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sortType === "priceDown") {
      return [...mergedQuery].sort((a, b) => {
        return a.price - b.price;
      });
    }
  }, [mergedQuery, sortType]);

  const emptyTabs = tabs.length < 1;
  const emptyClasses = emptyTabs ? "hidden" : "";

  return (
    <div
      className={`${emptyClasses}  md:container bg-inherit h-full w-full p-2`}
    >
      <div className="flex flex-wrap relative">
        <div
          onClick={() => {
            setHideSearch(false);
            document.getElementById("root").scrollTo(0, 0);
          }}
          className={`fixed top-2 right-8 ${
            hideSearch ? "" : "hidden"
          } md:invisible`}
        >
          <button className="rounded-lg backdrop-blur border-2 border-black">
            <i className="bi bi-search-heart p-1 text-base"></i>
          </button>
        </div>

        {tabs.map((tab, i) => {
          const isActive = tab.key === selectedKey;

          const activeClasses = isActive
            ? "bg-secondary-200 border-2 border-secondary-300 rounded text-primary-900"
            : " border-2 bg-secondary-50 border-secondary-100 hover:bg-secondary-100 rounded text-primary-900";

          function removeTab() {
            /* const currentTabIndex = tabs.findIndex(t => t === tab) */
            //setTabs(tabs.filter((t) => t !== tab))
            if (i === 0 && tabs.length > 1) {
              setSelectedKey(tabs[1].key);
            } else if (i === tabs.length - 1 && tabs.length > 1) {
              setSelectedKey(tabs[i - 1].key);
            } else if (tabs.length > 1) {
              setSelectedKey(tabs[i + 1].key);
            }

            setTabs(tabs.filter((t) => t !== tab));
            console.log(i);
            console.log(tabs);
          }

          return (
            <div
              className={`drop-shadow ${activeClasses} py-2 px-4 mr-1 flex items-center cursor-default`}
            >
              <span
                onClick={() => {
                  setSelectedKey(tab.key);
                }}
                className=""
              >
                <span className="capitalize">{tab.name}</span>:{" "}
                {tab.key[2].fromDay}.{tab.key[2].fromMonth} - {tab.key[2].toDay}
                .{tab.key[2].toMonth}
              </span>
              <i
                onClick={() => removeTab()}
                className={`${
                  isActive ? "hover:bg-secondary-400" : "hover:bg-secondary-400"
                } bi bi-x ml-1 text-2xl cursor-pointer rounded-full w-8 h-8 text-center`}
              ></i>
            </div>
          );
        })}
      </div>

      {/* possible outcomes query */}
      {query.isLoading && (
        <button
          type="button"
          className="mt-8 ml-4 mb-2 flex items-center rounded-lg bg-accent-400 hover:bg-accent-500 px-4 py-2 text-white"
          disabled
        >
          <svg
            className="mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="font-medium"> Processing... </span>
        </button>
      )}

      {!query.data && !query.isLoading && !query.isError && (
        <button
          onClick={() => query.refetch()}
          className="bg-accent-400 hover:bg-accent-500 mb-2 text-white font-bold py-2 px-4 rounded mt-8 ml-4"
        >
          Reload
        </button>
      )}

      {query.isError && !query.data && (
        <div className="mt-8 ml-4 mb-2">
          
          <button
            onClick={() => query.refetch()}
            className="bg-accent-400 hover:bg-accent-500 text-white font-bold py-2 px-4 rounded mt-8 mr-4"
          >
            Reload
          </button>
          <span>Error occured, no results</span>
        </div>
      )}

      {sortedQuery.length > 0 && (
        <div className="flex flex-wrap justify-end gap-4 mt-2 mb-2">
          {/* <button
            onClick={() => setSortType("ratingUp")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-[110px]"
          >
            Rating
            <i className="p-1 bi bi-arrow-down"></i>
          </button>
          <button
            onClick={() => setSortType("ratingDown")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-[110px]"
          >
            Rating
            <i className="p-1 bi bi-arrow-up"></i>
          </button>
          <button
            onClick={() => setSortType("priceUp")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-[110px]"
          >
            Price
            <i className="p-1 bi bi-arrow-down"></i>
          </button>
          <button
            onClick={() => setSortType("priceDown")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-[110px]"
          >
            Price
            <i className="p-1 bi bi-arrow-up"></i>
          </button> */}
          <button
            className="w-[90px] text-white text-xs bg-accent-400 hover:bg-accent-500 font-bold py-1 border border-amber-500 rounded-full pl-5"
            onClick={() => {
              sortType !== "priceDown"
                ? setSortType("priceDown")
                : setSortType("priceUp");
            }}
          >
            Price
            {sortType === "priceUp" && (
              <i className="p-1 bi bi-arrow-up textwhite"></i>
            )}
            {sortType === "priceDown" && (
              <i className="p-1 bi bi-arrow-down textwhite"></i>
            )}
            {sortType !== "priceDown" && sortType !== "priceUp" && (
              <i className="p-1 bi bi-arrow-down text-accent-400"></i>
            )}
          </button>
          <button
            className="w-[90px] text-white text-xs bg-accent-400 hover:bg-accent-500 font-bold py-1 border border-amber-500 rounded-full pl-5"
            onClick={() => {
              sortType !== "ratingDown"
                ? setSortType("ratingDown")
                : setSortType("ratingUp");
            }}
          >
            Rating
            {sortType === "ratingUp" && (
              <i className="px-1 bi bi-arrow-up textwhite"></i>
            )}
            {sortType === "ratingDown" && (
              <i className="px-1 bi bi-arrow-down textwhite"></i>
            )}
            {sortType !== "ratingDown" && sortType !== "ratingUp" && (
              <i className="px-1 bi bi-arrow-down text-accent-400"></i>
            )}
          </button>
        </div>
      )}

      {sortedQuery.length > 0 ? (
        <div className="hidden md:flex justify-around border-b-2 border-t-2 border-secondary-900">
          <h1 className="text-primary-900 font-bold p-2 text-2xl rounded my-2">
            Booking
          </h1>
          <h1 className="text-primary-900 font-bold p-2 text-2xl rounded my-2">
            AirBNB
          </h1>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col lg:grid grid-cols-9 mx-auto p-2 pt-0 text-blue-50 ">
        {sortedQuery?.map((offer, i) => {
          if (offer.provider === "booking") {
            return <Booking key={i} offer={offer} />;
          } else {
            return <Airbnb key={i} offer={offer} />;
          }
        })}
      </div>
    </div>
  );
}

function Booking({ offer }) {
  return (
    <div className="flex flex-row-reverse md:contents">
      <div className="mr-10 md:mr-0 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md w-full">
        {/* <div className="h-[204px] w-[204px] mb-4 mx-auto"> */}
        <div className="mx-auto relative">
          <a href={offer.link} target="_blank" rel="noreferrer">
            {/* <img
              src={offer.image}
              alt="img"
              className="m-auto h-[204px] w-[204px] object-cover scale-110 transition-all duration-400 hover:scale-100"
            /> */}
            <img
              src={offer.image}
              alt="img"
              className="rounded-xl object-cover h-full w-full max-w-[315px] mx-auto hover:scale-110 transform transition duration-500"
            />
          </a>
          <div className="rounded-xl flex flex-col absolute bg-primary-900 bottom-0 w-full opacity-80 max-w-[315px] left-[50%] translate-x-[-50%]">
            <h3 className="font-semibold text-center mb-1">{offer.title}</h3>
            <p className="leading-tight text-center mb-1">
              Price: {offer.price} €
            </p>
            <p className="leading-tight text-center mb-1">
              Rating: {offer.score}
            </p>
            <p className="leading-tight text-center mb-1 md:hidden">
              Provider: {offer.provider}
            </p>
          </div>
        </div>
      </div>

      <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
        <div className="hidden md:flex h-full w-6 items-center justify-center">
          <div className="h-full w-1 bg-secondary-900 pointer-events-none"></div>
        </div>
        <div className="hidden lg:block w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-secondary-900 shadow"></div>
      </div>
    </div>
  );
}

function Airbnb({ offer }) {
  return (
    <div className="mr-10 ml-10 flex md:contents">
      <div className="col-start-5 col-end-6 md:mx-auto relative">
        <div className="hidden md:flex h-full w-6  items-center justify-center">
          <div className="h-full w-1 bg-secondary-900 pointer-events-none"></div>
        </div>
        <div className="hidden lg:block w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-secondary-900 shadow"></div>
      </div>

      <div className="col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
        <div className="mx-auto relative">
          <a href={offer.link} target="_blank" rel="noreferrer">
            <img
              src={offer.image}
              alt="img"
              className="object-cover w-full aspect-square max-w-[315px]  mx-auto hover:scale-110 transform transition duration-500 rounded-xl"
            />
          </a>
          <div className="rounded-xl flex flex-col absolute bg-primary-900 bottom-0 w-full opacity-80">
            <h3 className="font-semibold text-center mb-1">{offer.title}</h3>
            <p className="leading-tight text-center mb-1">
              Price: {offer.price} €
            </p>
            <p className="leading-tight text-center mb-1">
              Rating: {offer.score}
            </p>
            <p className="leading-tight text-center mb-1 md:hidden ">
              Provider: {offer.provider}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
