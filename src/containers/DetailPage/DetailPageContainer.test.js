import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DetailPageContainer from "./DetailPageContainer";

import { MemoryRouter as Router, Route } from "react-router-dom";

const renderComponent = ({ movieId, categoryId }) =>
  render(
    <Router initialEntries={[`/movie/${movieId}/${categoryId}`]}>
      <Route path={`/movie/:id/:categoryId`}>
        <DetailPageContainer />
      </Route>
    </Router>
  );

it("fetching movieData: Infinite", async () => {
  const { getByText, getByTitle, queryByText } = renderComponent({
    movieId: 581726,
    categoryId: 28,
  });

  expect(queryByText("Loading...")).toBeTruthy();

  const resolvedData = await waitFor(() => getByText("Infinite"), {
    timeout: 1000,
  });

  expect(queryByText("Loading...")).toBeNull();

  expect(getByTitle("detailPageContainer")).toBeTruthy();

  expect(resolvedData).toBeTruthy();
});

it("fetching bad movie query", async () => {
  const { getByText, getByTitle, queryByText } = renderComponent({
    movieId: "badParam",
    categoryId: 28,
  });

  expect(queryByText("Loading...")).toBeTruthy();

  await waitFor(() => getByText("Infinite"), {
    timeout: 1000,
  }).catch(() => {
    expect(queryByText("Loading...")).toBeTruthy();
  });
});

it("integration click with DetailPage", async () => {
  const { getByText, getByTitle, queryByText } = renderComponent({
    movieId: 581726,
    categoryId: 28,
  });

  const resolvedData = await waitFor(() => getByText("Infinite"), {
    timeout: 1000,
  });

  const wishListButton = getByTitle("wishListButton");
  fireEvent.click(wishListButton);
  expect(resolvedData).toBeTruthy();
});
