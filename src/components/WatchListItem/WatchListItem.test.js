import { render, fireEvent } from "@testing-library/react";
import WatchListItem from ".";
import { mockedMovieData } from "../../utils/mocks";
import { BrowserRouter as Router } from "react-router-dom";

it("item rendering and clicks", () => {
  const mockedFunction1 = jest.fn();
  const mockedFunction2 = jest.fn();

  const { getByAltText, getByTitle } = render(
    <Router>
      <WatchListItem
        key={mockedMovieData.id}
        clickedToClose={() => mockedFunction1()}
        WatchListItemClickedHandler={() => mockedFunction2()}
        movieData={mockedMovieData}
      />
    </Router>
  );
  expect(getByAltText(mockedMovieData.title)).toBeTruthy();

  const linkBtn = getByTitle(`Link-${mockedMovieData.title}`);
  fireEvent.click(linkBtn);

  const closeBtn = getByTitle(`ItemRemove-${mockedMovieData.title}`);
  fireEvent.click(closeBtn);

  expect(mockedFunction1).toHaveBeenCalled();
  expect(mockedFunction2).toHaveBeenCalled();
});
