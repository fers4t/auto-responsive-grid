import React, { useRef, useState, useCallback, useEffect } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["maxColumnCount", "minColumnCount", "children", "gap"],
    _excluded2 = ["minWidth", "children"];
function GridAutoResponsiveWrapper(props) {
  var maxColumnCount = props.maxColumnCount,
      _props$minColumnCount = props.minColumnCount,
      minColumnCount = _props$minColumnCount === void 0 ? 1 : _props$minColumnCount,
      _props$gap = props.gap,
      gap = _props$gap === void 0 ? 0 : _props$gap,
      children = props.children;
  var wrapperRef = useRef(null);

  var _useState = useState(),
      wrapperWidth = _useState[0],
      setWrapperWidth = _useState[1];

  var gridItemWidthInWrapper = Array.from(children)[0].props.minWidth;

  var _useState2 = useState(),
      currentRowCount = _useState2[0],
      setCurrentRowCount = _useState2[1];

  var handleWindowResize = useCallback(function () {
    var _wrapperRef$current;

    setWrapperWidth((_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === void 0 ? void 0 : _wrapperRef$current.offsetWidth);
  }, []);
  useEffect(function () {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.clientWidth);
    }
  }, [wrapperRef]);
  useEffect(function () {
    window.addEventListener('resize', handleWindowResize);
    return function () {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);
  useEffect(function () {
    if (wrapperWidth && gridItemWidthInWrapper && gap && maxColumnCount) {
      if (wrapperWidth - gap * (maxColumnCount - 1) >= gridItemWidthInWrapper * maxColumnCount) {
        setCurrentRowCount(maxColumnCount);
      } else {
        var autoResponsiveCols = Math.floor((wrapperWidth - gap * (maxColumnCount - 1)) / gridItemWidthInWrapper);

        if (autoResponsiveCols <= minColumnCount) {
          setCurrentRowCount(minColumnCount);
        } else {
          setCurrentRowCount(autoResponsiveCols);
        }
      }
    }
  }, [wrapperWidth, gridItemWidthInWrapper]);

  var jsxAttributes = function (_ref) {
    var o = _objectWithoutPropertiesLoose(_ref, _excluded);

    return o;
  }(props);

  return React.createElement("div", Object.assign({
    ref: wrapperRef,
    style: {
      display: 'grid',
      gridTemplateColumns: "repeat(" + currentRowCount + ", 1fr)",
      gridGap: gap + 'px'
    }
  }, jsxAttributes), children);
}
function GridAutoResponsiveItem(props) {
  var children = props.children,
      minWidth = props.minWidth;
  var child = React.Children.only(children);

  var jsxAttributes = function (_ref2) {
    var o = _objectWithoutPropertiesLoose(_ref2, _excluded2);

    return o;
  }(props);

  var singleGridElementWithMinWidth = React.cloneElement(child, _extends({
    style: {
      minWidth: minWidth + 'px',
      width: '100%'
    }
  }, jsxAttributes));
  return singleGridElementWithMinWidth;
}

export { GridAutoResponsiveItem, GridAutoResponsiveWrapper };
//# sourceMappingURL=index.modern.js.map
