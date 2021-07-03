import { render } from "@testing-library/react";
import CarouselItem from ".";
import { mockedMovieList } from "../../utils/mocks";
import { BrowserRouter as Router } from "react-router-dom";

it("item rendering", () => {
  mockedMovieList.forEach((movie) => {
    const { getByText, getByAltText } = render(
      <Router>
        <CarouselItem
          categoryId={0}
          id={movie.id}
          key={`Action-${movie.title}`}
          title={movie.title}
          imageUrl={movie.backdrop_path}
        />
      </Router>
    );
    expect(getByText(movie.title)).toBeTruthy();
    expect(getByAltText(movie.title)).toBeTruthy();
  });
});
