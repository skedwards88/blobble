import {convertYYYYMMDDToDate} from "./convertYYYYMMDDToDate";

export function hasVisitedSince() {
  let lastVisitedYYYYMMDD = JSON.parse(
    localStorage.getItem("blobbleLastVisited"),
  );

  if (!lastVisitedYYYYMMDD) {
    return false;
  }

  const lastVisitedDate = convertYYYYMMDDToDate(lastVisitedYYYYMMDD);

  const resetDate = convertYYYYMMDDToDate("20240429");

  console.log(lastVisitedDate);
  console.log(resetDate);
  console.log(lastVisitedDate >= resetDate);
  return lastVisitedDate >= resetDate;
}
