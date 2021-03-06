import React, { ReactElement } from 'react';
export declare function ResponsiveGridWrapper(props: ResponsiveGridWrapperProps): JSX.Element;
export declare function ResponsiveGridItem(props: ResponsiveGridItemProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
/**
 * Think this as a grid div.
 */
interface ResponsiveGridWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * How many columns should be in the grid at max.
     */
    maxColumnCount: number;
    /**
     * How many columns should be in the grid at min.
     * Default: 1
     */
    minColumnCount?: number;
    /**
     * Spaces between grid items. Default: 0
     */
    gap?: number;
    children: any;
}
/**
 * Think this as a div in grid.
 */
interface ResponsiveGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactElement;
    /**
     * You must enter a min-width value for understand when resizing should stop.
     */
    minWidth: number;
}
export {};
