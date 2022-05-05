import React, { useRef, useState, useCallback, useEffect } from 'react';

function GridAutoResponsiveWrapper(props) {
  const {
    maxColumnCount,
    minColumnCount = 1,
    gap = 0,
    children
  } = props;
  const wrapperRef = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState();
  const gridItemWidthInWrapper = Array.from(children)[0].props.minWidth;
  const [currentRowCount, setCurrentRowCount] = useState();
  const handleWindowResize = useCallback(() => {
    var _wrapperRef$current;

    setWrapperWidth((_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === void 0 ? void 0 : _wrapperRef$current.offsetWidth);
  }, []);
  useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.clientWidth);
    }
  }, [wrapperRef]);
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);
  useEffect(() => {
    if (wrapperWidth && gridItemWidthInWrapper && gap && maxColumnCount) {
      if (wrapperWidth - gap * (maxColumnCount - 1) >= gridItemWidthInWrapper * maxColumnCount) {
        setCurrentRowCount(maxColumnCount);
      } else {
        const autoResponsiveCols = Math.floor((wrapperWidth - gap * (maxColumnCount - 1)) / gridItemWidthInWrapper);

        if (autoResponsiveCols <= minColumnCount) {
          setCurrentRowCount(minColumnCount);
        } else {
          setCurrentRowCount(autoResponsiveCols);
        }
      }
    }
  }, [wrapperWidth, gridItemWidthInWrapper]);

  const jsxAttributes = (({
    maxColumnCount,
    minColumnCount,
    children,
    gap,
    ...o
  }) => o)(props);

  return React.createElement("div", Object.assign({
    ref: wrapperRef,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${currentRowCount}, 1fr)`,
      gridGap: gap + 'px'
    }
  }, jsxAttributes), children);
}
function GridAutoResponsiveItem(props) {
  const {
    children,
    minWidth
  } = props;
  const child = React.Children.only(children);

  const jsxAttributes = (({
    minWidth,
    children,
    ...o
  }) => o)(props);

  const singleGridElementWithMinWidth = React.cloneElement(child, {
    style: {
      minWidth: minWidth + 'px',
      width: '100%'
    },
    ...jsxAttributes
  });
  return singleGridElementWithMinWidth;
}

export { GridAutoResponsiveItem, GridAutoResponsiveWrapper };
//# sourceMappingURL=index.modern.js.map
