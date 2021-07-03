import { render, fireEvent } from "@testing-library/react";
import Header from ".";
import { MemoryRouter as Router } from "react-router-dom";
import { mockedMovieList } from "../../utils/mocks";

const mockedFunction = jest.fn();

it("header render and click", () => {
  const { getByText } = render(
    <Router>
      <Header
        movies={mockedMovieList}
        removeError={mockedFunction}
        removeMovie={mockedFunction}
      />
    </Router>
  );

  const title = getByText("Cool Movies");
  expect(title).toBeTruthy();
  fireEvent.click(title);
  expect(mockedFunction).toHaveBeenCalled();
});
