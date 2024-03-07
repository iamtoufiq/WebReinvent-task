import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { RequiresAuth } from "../RequiresAuth";

// Mocking sessionStorage
const mockSessionStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

// Test component
const TestComponent = () => <div>Test Component</div>;

describe("RequiresAuth", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("renders children when token is present in sessionStorage", () => {
    sessionStorage.setItem("token", "QpwL5tke4Pnpja7X4");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Route path="/">
          <RequiresAuth>
            <TestComponent />
          </RequiresAuth>
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });

  test("redirects to /signin when token is not present in sessionStorage", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Route path="/">
          <RequiresAuth>
            <TestComponent />
          </RequiresAuth>
        </Route>
        <Route path="/signin">
          <div>Sign In</div>
        </Route>
      </MemoryRouter>
    );

    expect(screen.queryByText("Test Component")).not.toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
