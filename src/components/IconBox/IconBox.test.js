import { render, fireEvent } from "@testing-library/react";
import IconBox from ".";

it("check iconBox rendering", () => {
  const { getByTitle } = render(<IconBox children={<div></div>} />);
  expect(getByTitle("iconBox")).toBeTruthy();
});
