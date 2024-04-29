import "jest-localstorage-mock";
import {hasVisitedSince} from "./hasVisitedSince";

describe("hasVisitedSince", () => {
  test("returns false if lastVisited is not set", () => {
    localStorage.removeItem("blobbleLastVisited");
    expect(hasVisitedSince()).toBe(false);
  });

  test("returns false if lastVisited is set to a date before the reset date", () => {
    localStorage.setItem("blobbleLastVisited", JSON.stringify("20240428"));
    expect(hasVisitedSince()).toBe(false);
  });

  test("returns true if lastVisited is set to the reset date", () => {
    localStorage.setItem("blobbleLastVisited", JSON.stringify("20240429"));
    expect(hasVisitedSince()).toBe(true);
  });

  test("returns true if lastVisited is set to a date after the reset date", () => {
    localStorage.setItem("blobbleLastVisited", JSON.stringify("20240430"));
    expect(hasVisitedSince()).toBe(true);
  });
});
