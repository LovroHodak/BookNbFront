import "./App.css";
import React, { useState, useEffect } from "react";
import Aside from "./components/Aside";
import { getData } from "./useQueryHook";
import { useQuery } from "react-query";
import Offers from "./components/Offers";
import Welcome from "./components/Welcome";

function App() {

  /* useEffect(() => {
    alert('Unfortunately there are some problems with deploying backend so please run it locally.')
  }, [])
 */
  useEffect(() => {
    if(tabs.length === 0){

    }
  }, [])
  const [city, setCity] = useState("");
  const [dateObj, setDateObj] = useState({});
  // by default is true meaning it will fire up each time, but i want it controled
  // it will be called when i press search
  const [callQuery, setCallQuery] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [selectedKey, setSelectedKey] = useState();
  const [hideSearch, setHideSearch] = useState(false);

  // in case i close all tabs in small screen
  useEffect(() => {
    if(tabs.length === 0){
      setHideSearch(false)
    }
  }, [tabs.length])

  // empty by default, but gets filled while typing in destination and choosing date
  const queryKey = ["offers", city, dateObj];

 /*  console.log(selectedKey);
  console.log(queryKey); */

  // when there is only one activeKey===queryKey
  const activeKey = selectedKey || queryKey;

  const query = useQuery(
    activeKey,
    () => {
      // destruction of activekey
      // sending data to usequery
      const [_, city, dateObj] = activeKey;
      return getData(
        city,
        dateObj.fromDay,
        dateObj.fromMonth,
        dateObj.fromYear,
        dateObj.toDay,
        dateObj.toMonth,
        dateObj.toYear
      );
    },
    {
      // default: false
      enabled: callQuery,
      retry: false,

      onSuccess: () => {
        setCallQuery(false);
        setHideSearch(true);
      },
    }
  );
  console.log(tabs)
  console.log(query.data)
  //
  const addTab = () => {
    setSelectedKey(queryKey);
    setTabs((tabs) => tabs.concat({ name: city, key: queryKey }));
    // setTabs(tabs=> [...tabs,{ name: city, key: queryKey }])
  };

  return (
    <div className="h-screen flex flex-col md:flex-row md:flex-wrap lg:max-w-6xl m-auto">
      <Aside
        city={city}
        setCity={setCity}
        setDateObj={setDateObj}
        setCallQuery={setCallQuery}
        addTab={addTab}
        dateObj={dateObj}
        setHideSearch={setHideSearch}
        hideSearch={hideSearch}
        tabs={tabs}
      />

      <div className="md:mx-auto grow md:w-[340px] bg-secondary-500">
        {tabs.length === 0 && <Welcome />}
        <Offers
          setSelectedKey={setSelectedKey}
          selectedKey={selectedKey}
          tabs={tabs}
          setTabs={setTabs}
          airbnb={query.data?.air}
          booking={query.data?.book}
          query={query}
          setHideSearch={setHideSearch}
          hideSearch={hideSearch}
        />
      </div>
    </div>
  );
}

export default App;
