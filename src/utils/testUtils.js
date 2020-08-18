import { theme } from "@chakra-ui/core";
import { GlobalStyle, ThemeProvider } from "@chakra-ui/system";
import CSSReset from "@chakra-ui/css-reset";
import { render, fireEvent } from "@testing-library/react";
import * as React from "react";
import { toHaveNoViolations } from "jest-axe";
import serializer from "jest-emotion";

expect.addSnapshotSerializer(serializer);

expect.extend(toHaveNoViolations);

const AllProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";

export {
  act as invoke,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks";

export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };

export * from "jest-axe";

export const escape = (ui) =>
  fireEvent.keyDown(ui, { key: "Escape", keyCode: 27 });
