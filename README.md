![Build Status](https://github.com/gadogado/use-scrollable-ref/actions/workflows/main.yml/badge.svg)
[![NPM](https://img.shields.io/npm/v/use-scrollable-ref.svg)](https://www.npmjs.com/package/use-scrollable-ref)

# useScrollableRef

> Get scroll events with an optional 'bottom reached' threshold for any DOM node that's attached with a ref.  

> This can be useful for scroll, height, and offset calculations for a child node instead of the window, e.g., inifite scrolling a `div` in the document that has a scroll overflow ( `overflow: scroll` )

## Install
```
npm install use-scrollable-ref
```

## Example usage

```tsx
import { useEffect } from "react";
import useScrollableRef from "use-scrollable-ref";

export default function App() {
  // bottom is 75% of ref height
  const bottomThreshold = 75; 

  const {
    scrollableRef,
    scrollHeight,
    scrollPosition,
    scrollOffsetHeight,
    scrollableBottomReached,
  } = useScrollableRef({ bottomThreshold });
  
  useEffect(() => {
    if (!scrollableBottomReached) return;
    // do something ...
  }, [scrollableBottomReached]);

  return (
    <div>
      <main ref={scrollableRef}>
        Scrollable content here ...
      </main>
    </div>
  )
}

```

## API

This hook accepts an **optional** `bottomThreshold` which is the % of the current scroll position from the top of the ref element's height.  By default this is set to `75`

The hook returns the following:

- `scrollableRef` - A ref to be attached to the HTMLElement
- `scrollableBottomReached` - a boolean indicating whether the bottomThreshold of the ref element has been reached.  
- `scrollHeight` - https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight 
- `scrollPosition` - https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
- `scrollOffsetHeight` - https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight

## License

MIT © [Geoff Ereth](https://github.com/gadogado)






