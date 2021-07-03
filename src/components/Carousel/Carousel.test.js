import { render, fireEvent } from "@testing-library/react";
import Carousel from ".";
import { mockedMovieList } from "../../utils/mocks";

const children = mockedMovieList.map((movie, i) => {
  return (
    <div id={movie.id} key={`Action-${movie.title}${i}`} title={movie.title} />
  );
});

it("carousel sliding by number buttons", () => {
  const { getByText, getByTitle } = render(
    <Carousel children={children} categoryName="Action" />
  );

  mockedMovieList.forEach((mov, i) => {
    const numberBtn = getByText(`${i + 1}`);
    fireEvent.click(numberBtn);
    expect(getByTitle("inner")).toHaveStyle(
      `transform: translateX(-${i * 100}%);`
    );
  });
});

it("carousel sliding by next and prev buttons", () => {
  const { getByText, getByTitle } = render(
    <Carousel children={children} categoryName="Action" />
  );
  const nextBtn = getByText("Next");
  const prevBtn = getByText("Prev");

  // Going Forward
  mockedMovieList.forEach((mov, i) => {
    let count;
    fireEvent.click(nextBtn);
    if (i === mockedMovieList.length - 1) {
      count = 0;
    } else {
      count = i + 1;
    }
    expect(getByTitle("inner")).toHaveStyle(
      `transform: translateX(-${count * 100}%);`
    );
  });

  // Going Backwards
  for (let i = 0; i < mockedMovieList.length; i++) {
    let nextSlide;
    if (i === 0) {
      nextSlide = mockedMovieList.length - 1;
    } else {
      nextSlide = mockedMovieList.length - i - 1;
    }
    fireEvent.click(prevBtn);
    const count = nextSlide;
    expect(getByTitle("inner")).toHaveStyle(
      `transform: translateX(-${count * 100}%);`
    );
  }
});

it("rendering categoryName true", () => {
  const categories = ["Action", "Adventure", "Horror"];
  categories.forEach((car) => {
    const { getByText } = render(
      <Carousel children={children} categoryName={car} />
    );
    expect(getByText(car)).toBeTruthy();
  });
});

it("rendering categoryName false", () => {
  const { queryByText, queryByTitle } = render(
    <Carousel children={children} categoryName={""} />
  );
  expect(queryByText("Movie List")).toBeNull();
  expect(queryByTitle("CategoryTitle")).toBeNull();
});
