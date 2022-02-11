import { render } from "@testing-library/react";
import Contact from "./contact";
import { BrowserRouter } from "react-router-dom";

describe("contact page - smoke test", () => {
  it("renders", () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );
  });
});
