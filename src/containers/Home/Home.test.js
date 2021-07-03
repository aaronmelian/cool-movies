import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Home from ".";

import { MemoryRouter as Router, Route } from "react-router-dom";

it("fetching category data", async () => {
  const { getByTitle } = render(
    <Router>
      <Home type="movie" />
    </Router>
  );

  expect(getByTitle("Home")).toBeTruthy();

  const resolvedData = await waitFor(() => getByTitle("HomeTitle"), {
    timeout: 1000,
  });

  expect(resolvedData).toBeTruthy();
});

it("fetching category error", async () => {
  const { getByTitle, queryByTitle } = render(
    <Router>
      <Home type="badParam" />
    </Router>
  );

  expect(getByTitle("Home")).toBeTruthy();

  const resolvedData = await waitFor(() => getByTitle("HomeTitle"), {
    timeout: 1000,
  }).catch(() => {
    expect(queryByTitle("HomeTitle")).toBeNull();
  });
});

it("fetching categoryData error", async () => {
  const { getByTitle, queryByTitle } = render(
    <Router>
      <Home type="movie" action="badParam" />
    </Router>
  );

  expect(getByTitle("Home")).toBeTruthy();

  const resolvedData = await waitFor(() => getByTitle("HomeTitle"), {
    timeout: 1000,
  }).catch(() => {
    expect(queryByTitle("HomeTitle")).toBeNull();
  });
});
