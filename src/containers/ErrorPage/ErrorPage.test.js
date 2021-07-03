import { render, fireEvent } from "@testing-library/react";
import ErrorPage from ".";
import { MemoryRouter as Router } from "react-router-dom";

const mockedFunction = jest.fn();

it("error page render", () => {
  const { getByText, queryByText } = render(
    <Router>
      <ErrorPage error={"There is an error"} removeError={mockedFunction} />
    </Router>
  );

  const errorText = getByText("There is an error");
  expect(errorText).toBeTruthy();
  const removeErrorBtn = queryByText("Go back to Cool Movies");

  expect(removeErrorBtn).toBeTruthy();
  fireEvent.click(removeErrorBtn);
  expect(mockedFunction).toHaveBeenCalled();
});
