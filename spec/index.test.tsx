import React, { FC, ReactElement } from "react";
import useScrollableRef from "../src";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

interface Scrollable {
  bottomThreshold?: number;
}

const AppWithScrollableRef: FC<Scrollable> = ({
  bottomThreshold,
}): ReactElement => {
  const { scrollableRef, scrollableBottomReached } = useScrollableRef({
    bottomThreshold,
  });
  return (
    <div>
      <main data-testid="scrollable" ref={scrollableRef} />
      <div className="status">{String(scrollableBottomReached)}</div>
    </div>
  );
};

test("changes when the bottom threshold has been reached", () => {
  const bottomThreshold = 75;
  const { getByTestId, container } = render(
    <AppWithScrollableRef bottomThreshold={bottomThreshold} />
  );
  const statusElem = container.getElementsByClassName("status")[0];
  const scrollableElem = getByTestId("scrollable");
  Object.defineProperty(scrollableElem, "scrollHeight", { value: 100 });

  fireEvent.scroll(scrollableElem, {
    target: { scrollTop: bottomThreshold - 1 },
  });
  expect(statusElem).toHaveTextContent("false");

  fireEvent.scroll(scrollableElem, {
    target: { scrollTop: bottomThreshold },
  });
  expect(statusElem).toHaveTextContent("true");
});
