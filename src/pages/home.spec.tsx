import { render } from "@testing-library/react";
import Home from "./home";
import { BrowserRouter } from "react-router-dom";

describe("home page - smoke test", () => {
  it("renders", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });
});
