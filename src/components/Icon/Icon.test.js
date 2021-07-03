import { render, fireEvent } from "@testing-library/react";
import Icon from ".";

it("check icon rendering", () => {
  const { getByTitle } = render(<Icon icon="Menu" />);
  expect(getByTitle("iconBtn")).toBeTruthy();
});

it("icon clicked", () => {
  const mockedFunction = jest.fn();

  const { getByTitle } = render(<Icon icon="Menu" clicked={mockedFunction} />);
  const iconBtn = getByTitle("iconBtn");

  fireEvent.click(iconBtn);
  expect(mockedFunction).toHaveBeenCalled();
});
