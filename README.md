# @laser-ui/rcharts

Apache Echarts for React.

# Installation

```
npm install @laser-ui/rcharts
```

# Getting Started

```tsx
import type * as echarts from 'echarts';

import { RCharts } from '@laser-ui/rcharts';
import { useCallback, useEffect, useRef } from 'react';

export default function App() {
  const chartRef = useRef<echarts.ECharts>(null);
  const chartCallbackRef = useCallback((chart: echarts.ECharts) => {
    chart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    });
    chartRef.current = chart;
  }, []);

  useEffect(() => {
    const tid = setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.setOption(
          {
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260].reverse(),
                type: 'line',
              },
            ],
          },
          { replaceMerge: 'series' },
        );
      }
    }, 3000);
    return () => {
      clearTimeout(tid);
    };
  }, []);

  return <RCharts ref={chartCallbackRef} style={{ width: 400, height: 400 }} />;
}
```

# API

```ts
interface RChartsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
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
```
