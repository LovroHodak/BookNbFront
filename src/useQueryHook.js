export async function getData(
  city,
  startDay,
  startMonth,
  startYear,
  endDay,
  endMonth,
  endYear
) {
  // city is params, else is body, because on BE: router.get("/api/data/:mesto", async (req, res) => {});
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/data/${city}?startDay=${startDay}&startMonth=${startMonth}&startYear=${startYear}&endDay=${endDay}&endMonth=${endMonth}&endYear=${endYear}`
  );

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.message, data);
  }
  return data;
}
