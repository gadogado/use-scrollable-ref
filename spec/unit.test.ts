import { renderHook } from "@testing-library/react";
import useScrollableRef from "../src/index";
import React from "react";

describe("useScrollableRef", () => {
  test("initializes ref, scroll context, and bottomReached", () => {
    const refElem = document.createElement("div");
    jest.spyOn(React, "useRef").mockReturnValueOnce({ current: refElem });

    const { result } = renderHook(() => useScrollableRef());
    const {
      scrollPosition,
      scrollHeight,
      scrollOffsetHeight,
      scrollableBottomReached,
      scrollableRef,
    } = result.current;
    expect(scrollPosition).toBe(0);
    expect(scrollHeight).toBe(0);
    expect(scrollOffsetHeight).toBe(0);
    expect(scrollOffsetHeight).toBe(0);
    expect(scrollableBottomReached).toBe(false);
    expect(scrollableRef).toEqual({ current: refElem });
  });
});
