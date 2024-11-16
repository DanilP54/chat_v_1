import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PhoneNumberEntry from "./phone.number.entry";
import userEvent from "@testing-library/user-event";
// import { http, HttpResponse } from "msw";

const callback = vi.fn();

describe("<PhoneNumberEntry />", () => {
  it("should render", () => {
    render(<PhoneNumberEntry setNextStep={callback} />);
    const element = screen.getByText("Введите свой номер телефона");
    expect(element).toBeInTheDocument();
  });

  it("submit phone number", async () => {
    const user = userEvent.setup();

    render(<PhoneNumberEntry setNextStep={callback} />);

    const button = screen.getByRole("button");

    await user.click(button);
  });
});
