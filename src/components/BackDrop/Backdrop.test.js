import { render, fireEvent } from "@testing-library/react";
import Backdrop from ".";

it("backdrop reendering", () => {
  const { getByTestId } = render(<Backdrop show={true} />);
  expect(getByTestId("backdrop")).toBeTruthy();
  expect(getByTestId("backdrop")).toBeEmptyDOMElement();
});

it("backdrop not rendering", () => {
  const { queryByTestId } = render(<Backdrop show={false} />);
  expect(queryByTestId("backdrop")).toBeNull();
});

it("backdrop clicked", () => {
  const mockedFunction = jest.fn();

  const { getByTestId } = render(
    <Backdrop show={true} clickHandler={mockedFunction} />
  );
  const bckdrp = getByTestId("backdrop");
  fireEvent.click(bckdrp);
  expect(mockedFunction).toHaveBeenCalled();
  fireEvent.click(bckdrp);
  expect(mockedFunction).toHaveBeenCalledTimes(2);
});
