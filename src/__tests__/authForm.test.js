import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// import AuthForm from './AuthForm';
import AuthForm from "../components/AuthForm";
// import { useApiCall } from '../hooks/usePost';
import useApiCall from "../hooks/usePost";

jest.mock("../hooks/usePost", () => ({
  useApiCall: jest.fn(),
}));

test("submits registration data", async () => {
  const mockApiCall = jest.fn();
  useApiCall.mockReturnValue({ isLoading: false, apiCall: mockApiCall });

  render(
    <MemoryRouter initialEntries={[{ pathname: "/signup" }]}>
      <AuthForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "eve.holt@reqres.in" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "cityslicka" },
  });
  fireEvent.click(screen.getByText("Sign in"));

  expect(mockApiCall).toHaveBeenCalledWith(
    "/register",
    { email: "eve.holt@reqres.in", password: "cityslicka" },
    "Registration successful!"
  );
});
