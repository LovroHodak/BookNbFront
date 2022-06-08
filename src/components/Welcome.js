import React from "react";
import AirBook from "../airbook.png";

export default function Welcome() {
  return (
    <div className="flex flex-col  ">
      <h1 className="text-2xl font-semibold text-center my-8 text-primary-900">
        Get Booking and Airbnb results with one search
      </h1>
      <div className="h-full w-full">
        <img src={AirBook} className="my-auto" alt="img" />
      </div>
    </div>
  );
}
