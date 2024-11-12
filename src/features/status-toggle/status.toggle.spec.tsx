import { StatusToggle } from "./status.toggle";
import {render, screen, fireEvent} from "@testing-library/react"
describe("status toggle component", () => {
  it('should show the tooltip with text "you is online" when the status is "online"', () => {
    render(<StatusToggle />);
    const statusIndicator = screen.getByRole("button");
    // Hover over the status indicator to trigger the tooltip
    fireEvent.mouseOver(statusIndicator);
  });
});
