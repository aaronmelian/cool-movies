import { render, fireEvent } from "@testing-library/react";

import DetailPage from ".";

import { fontClassGetterByIndex, frecuentUrls } from "../../utils/commonUtils";
import { mockedMovieData } from "../../utils/mocks";
import { MemoryRouter as Router } from "react-router-dom";

const mockedFunction = jest.fn();

const renderComponent = ({ isOnWishList, loading, cateId, movieDetails }) =>
  render(
    <Router>
      <DetailPage
        movieDetails={movieDetails}
        movieId={mockedMovieData.id}
        categoryId={cateId || 0}
        isOnWishList={isOnWishList}
        loading={loading}
        addOrRemove={mockedFunction}
      />
    </Router>
  );

it("item rendering and click to add", () => {
  // Check if component renders with movie to Add and required classByCategoryId.
  const catId = 28;
  const { getByTitle, getByText, queryByText, getByAltText } = renderComponent({
    movieDetails: mockedMovieData,
    cateId: catId,
    isOnWishList: false,
    loading: false,
  });
  const detailPage = getByTitle("detailPage");

  expect(detailPage).toBeTruthy();
  expect(detailPage).toHaveClass(`DetailPage ${fontClassGetterByIndex(catId)}`);
  expect(detailPage).toHaveStyle(
    `background-image: url(${frecuentUrls.baseImgUrls}${mockedMovieData.backdrop_path})`
  );

  const btn = getByText("Add");

  expect(btn).toBeTruthy();
  expect(getByAltText(mockedMovieData.title)).toBeTruthy();
  expect(queryByText("Remove")).toBeNull();

  fireEvent.click(btn);
  expect(mockedFunction).toHaveBeenCalled();
});

it("item rendering and click to remove", () => {
  const catId = 16;
  // Check if component renders with movie to Remove and required classByCategoryId.
  const { getByTitle, getByText, queryByText } = renderComponent({
    movieDetails: mockedMovieData,
    cateId: catId,
    isOnWishList: true,
    loading: false,
  });
  const detailPage = getByTitle("detailPage");

  expect(detailPage).toBeTruthy();
  expect(detailPage).toHaveClass(`DetailPage ${fontClassGetterByIndex(catId)}`);

  const btn = getByText("Remove");

  expect(btn).toBeTruthy();
  expect(queryByText("Add")).toBeNull();

  fireEvent.click(btn);
  expect(mockedFunction).toHaveBeenCalled();
});

it("component loading", () => {
  const catId = 2;
  // Check if component renders when should not.
  const { queryByTitle } = renderComponent({
    movieDetails: mockedMovieData,
    cateId: catId,
    isOnWishList: true,
    loading: true,
  });

  expect(queryByTitle("detailPage")).toBeNull();
});

it("component without MovieData", () => {
  const catId = 2;
  // Check if component renders when should not.
  const { queryByTitle } = renderComponent({
    movieDetails: null,
    cateId: catId,
    isOnWishList: true,
    loading: false,
  });

  expect(queryByTitle("detailPage")).toBeNull();
});
