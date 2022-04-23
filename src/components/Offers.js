import React, { useMemo, useState } from "react";
import PlaceholderLoading from "react-placeholder-loading";

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

  const [sortType, setSortType] = useState();

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
    <div className={`${emptyClasses} md:container bg-violet-500 h-full w-full`}>
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
            <i className="bi bi-search-heart p-1"></i>
          </button>
        </div>

        {tabs.map((tab, i) => {
          const isActive = tab.key === selectedKey;

          const activeClasses = isActive
            ? "bg-red-500 border-2 border-white"
            : " border-2 border-transparent";

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
            <div className={`${activeClasses} py-2 px-4 mr-1`}>
              <span
                onClick={() => {
                  setSelectedKey(tab.key);
                }}
              >
                <span className="capitalize">{tab.name}</span>:{" "}
                {tab.key[2].fromDay}.{tab.key[2].fromMonth} - {tab.key[2].toDay}
                .{tab.key[2].toMonth}
              </span>
              <i onClick={() => removeTab()} className="bi bi-x"></i>
            </div>
          );
        })}
      </div>

      {/* possible outcomes query */}
      {query.isLoading && (
        <div className="flex justify-center items-center m-4">
          <PlaceholderLoading
            shape="rect"
            width={360}
            height={360}
            colorStart="pink"
            colorEnd="violet"
          />
        </div>
      )}

      {!query.data && !query.isLoading && !query.isError && (
        <button
          onClick={() => query.refetch()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          Reload
        </button>
      )}

      {query.isError && !query.data && <span>Error occured, no results</span>}

      {sortedQuery.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <button
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
          </button>
        </div>
      )}
      <div className="flex flex-col lg:grid grid-cols-9 mx-auto p-2 text-blue-50 ">
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
      <div className="mr-10 md:mr-0 bg-blue-500 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md w-full">
        <div className="h-[204px] w-[204px] mb-4 mx-auto">
          <a href={offer.link} target="_blank" rel="noreferrer">
            <img
              src={offer.image}
              alt="img"
              className="m-auto h-[204px] w-[204px] object-cover scale-110 transition-all duration-400 hover:scale-100"
            />
          </a>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-center mb-1">{offer.title}</h3>
          <p className="leading-tight text-center">Price: {offer.price} €</p>
          <p className="leading-tight text-center">Rating: {offer.score}</p>
        </div>
      </div>
      <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
        <div className="hidden md:flex h-full w-6 items-center justify-center">
          <div className="h-full w-1 bg-blue-800 pointer-events-none"></div>
        </div>
        <div className="hidden lg:block w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow"></div>
      </div>
    </div>
  );
}

function Airbnb({ offer }) {
  return (
    <div className="mr-10 ml-10 flex md:contents">
      <div className="col-start-5 col-end-6 md:mx-auto relative">
        <div className="hidden md:flex h-full w-6  items-center justify-center">
          <div className="h-full w-1 bg-pink-800 pointer-events-none"></div>
        </div>
        <div className="hidden lg:block w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-pink-500 shadow"></div>
      </div>

      <div className="bg-pink-500 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
        <div className="h-[204px] w-[204px] mb-4 mx-auto">
          <a href={offer.link} target="_blank" rel="noreferrer">
            <img
              src={offer.image}
              alt="img"
              className="m-auto h-[204px] w-[204px] object-cover scale-110 transition-all duration-400 hover:scale-100"
            />
          </a>
        </div>
        <div>
          <h3 className="font-semibold text-center mb-1">{offer.title}</h3>
          <p className="leading-tight text-center">Price: {offer.price} €</p>
          <p className="leading-tight text-center">Rating: {offer.score}</p>
        </div>
      </div>
    </div>
  );
}
