import { render, fireEvent, getByTitle } from "@testing-library/react";
import SideDrawer from ".";
import { MemoryRouter as Router } from "react-router-dom";
import { mockedMovieList } from "../../utils/mocks";

const mockedFunctionRemoveMovie = jest.fn();

it("sideDrawer render, open and close with backdrop test", () => {
  const { getByTitle, queryByTitle, getByTestId } = render(
    <Router>
      <SideDrawer
        movies={mockedMovieList}
        removeMovie={mockedFunctionRemoveMovie}
      />
    </Router>
  );
  const menuOpen = getByTitle("MenuOpen").firstChild;
  const menuClose = getByTitle("MenuClose").firstChild;

  const checkOpen = () => {
    expect(menuOpen).toBeTruthy();
    expect(queryByTitle("SideDrawer")).toHaveClass("close");
    expect(queryByTitle("BackdropContainer")).toBeNull();

    fireEvent.click(menuOpen);
    expect(queryByTitle("SideDrawer")).toHaveClass("open");
    expect(queryByTitle("BackdropContainer")).toBeTruthy();
  };

  // Open SideDrawer
  checkOpen();

  // Integration with Backdrop (Closing by backdrop)
  const bckdrop = getByTestId("backdrop");
  fireEvent.click(bckdrop);
  expect(queryByTitle("SideDrawer")).toHaveClass("close");
  expect(queryByTitle("BackdropContainer")).toBeNull();

  // Opening again
  checkOpen();

  // Close SideDrawer
  fireEvent.click(menuClose);
  expect(queryByTitle("SideDrawer")).toHaveClass("close");
  expect(queryByTitle("BackdropContainer")).toBeNull();
});

it("sideDrawer closing on every clicked Item and launching remove fucntion", () => {
  const { getByTitle, queryByTitle } = render(
    <Router>
      <SideDrawer
        movies={mockedMovieList}
        removeMovie={mockedFunctionRemoveMovie}
      />
    </Router>
  );

  // Integration with WatchListItem
  mockedMovieList.forEach((mov, i) => {
    const watchTestItem = queryByTitle(`Link-${mov.title}`);
    expect(watchTestItem).toBeTruthy();
    fireEvent.click(watchTestItem);

    expect(queryByTitle("SideDrawer")).toHaveClass("close");
    expect(queryByTitle("BackdropContainer")).toBeNull();

    const itemRemove = queryByTitle(`ItemRemove-${mov.title}`);
    fireEvent.click(itemRemove);
    expect(mockedFunctionRemoveMovie).toHaveBeenCalledTimes(i + 1);
  });
});
