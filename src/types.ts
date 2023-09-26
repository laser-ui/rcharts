export {};

export interface RChartsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  initOpts?: {
    theme?: string | object;
    locale?: string;
    renderer?: 'canvas' | 'svg';
    devicePixelRatio?: number;
    useDirtyRect?: boolean;
    useCoarsePointer?: boolean;
    pointerSize?: number;
    ssr?: boolean;
    width?: number | string;
    height?: number | string;
  };
  autoResize?: boolean;
  autoResizeDebounce?: number;
}
