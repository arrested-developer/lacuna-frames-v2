import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Quote from "./quote";

describe("smoke test", () => {
  it("renders", () => {
    render(
      <BrowserRouter>
        <Quote />
      </BrowserRouter>
    );
  });
});
