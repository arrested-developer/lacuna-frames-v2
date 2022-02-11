import { render } from "@testing-library/react";
import About from "./about";
import { BrowserRouter } from "react-router-dom";

describe("about page - smoke test", () => {
  it("renders", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
  });
});
