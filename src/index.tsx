import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

export function ResponsiveGridWrapper(props: ResponsiveGridWrapperProps) {
  const { maxColumnCount, minColumnCount = 1, gap = 0, children } = props
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [wrapperWidth, setWrapperWidth] = useState<number>()
  // get wrapper's child elements widths
  const gridItemWidthInWrapper: number = (
    Array.from(children as [])[0] as ReactElement
  ).props.minWidth

  const [currentRowCount, setCurrentRowCount] = useState<number>()

  const handleWindowResize = useCallback(() => {
    setWrapperWidth(wrapperRef.current?.offsetWidth as number)
  }, [])

  // const gridItemWidthFromRef = useCallback(() => {
  //   return wrapperRef.current?.children[0]?.scrollWidth as number
  // }, [])

  // TODO: problem with grid item's width

  useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.clientWidth)
    }
  }, [wrapperRef])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  useEffect(() => {
    // here's the magic
    if (wrapperWidth && gridItemWidthInWrapper && gap && maxColumnCount) {
      if (
        wrapperWidth - gap * (maxColumnCount - 1) >=
        gridItemWidthInWrapper * maxColumnCount
      ) {
        setCurrentRowCount(maxColumnCount)
      } else {
        const autoResponsiveCols = Math.floor(
          (wrapperWidth - gap * (maxColumnCount - 1)) / gridItemWidthInWrapper
        )
        if (autoResponsiveCols <= minColumnCount) {
          setCurrentRowCount(minColumnCount)
        } else {
          setCurrentRowCount(autoResponsiveCols)
        }
      }
    }
  }, [wrapperWidth, gridItemWidthInWrapper])

  const jsxAttributes = (({
    maxColumnCount,
    minColumnCount,
    children,
    style,
    gap,
    ...o
  }) => o)(props)

  return (
    <div
      ref={wrapperRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${currentRowCount}, 1fr)`,
        gridGap: gap + 'px',
        width: '100%',
        ...props.style
      }}
      {...jsxAttributes}
    >
      {children}
    </div>
  )
}

export function ResponsiveGridItem(props: ResponsiveGridItemProps) {
  // add min-width value to children
  const { children, minWidth } = props
  const child = React.Children.only(children)

  const jsxAttributes = (({ minWidth, children, style, ...o }) => o)(props)

  const singleGridElementWithMinWidth = React.cloneElement(child, {
    style: {
      minWidth: minWidth + 'px',
      width: '100%',
      ...props.children.props.style,
      ...props.style
    },
    ...jsxAttributes
  })

  return singleGridElementWithMinWidth
}

/**
 * Think this as a grid div.
 */
interface ResponsiveGridWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * How many columns should be in the grid at max.
   */
  maxColumnCount: number
  /**
   * How many columns should be in the grid at min.
   * Default: 1
   */
  minColumnCount?: number
  /**
   * Spaces between grid items. Default: 0
   */
  gap?: number
  children: any
}

/**
 * Think this as a div in grid.
 */
interface ResponsiveGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement
  /**
   * You must enter a min-width value for understand when resizing should stop.
   */
  minWidth: number
}
