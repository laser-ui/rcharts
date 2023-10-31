import type { RChartsProps } from './types';

import { useAsync, useResize, useUnmount } from '@laser-ui/hooks';
import * as echarts from 'echarts';
import { forwardRef, useCallback, useRef } from 'react';

export const RCharts = forwardRef<echarts.ECharts, RChartsProps>((props, ref): JSX.Element => {
  const {
    initOpts,
    autoResize = false,
    autoResizeDebounce = 0,

    ...restProps
  } = props;

  const elRef = useRef<HTMLDivElement>(null);

  const dataRef = useRef<{
    clearTid?: () => void;
  }>({});

  const async = useAsync();

  const instanceRef = useRef<echarts.ECharts | null>(null);
  const containerCallbackRef = useCallback<React.RefCallback<HTMLDivElement>>(
    (el) => {
      const setRef = (instance: echarts.ECharts | null) => {
        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
      };
      if (el) {
        instanceRef.current = echarts.init(el, initOpts?.theme, initOpts);
        setRef(instanceRef.current);
      } else {
        instanceRef.current?.dispose();
        instanceRef.current = null;
        setRef(null);
      }
    },
    [initOpts, ref],
  );
  useUnmount(() => {
    instanceRef.current?.dispose();
  });

  useResize(
    elRef,
    () => {
      dataRef.current.clearTid?.();
      const cb = () => {
        if (elRef.current) {
          const instance = echarts.getInstanceByDom(elRef.current.children.item(0) as HTMLElement);
          instance?.resize();
        }
      };
      if (autoResizeDebounce === 0) {
        cb();
      } else {
        dataRef.current.clearTid = async.setTimeout(() => {
          dataRef.current.clearTid = undefined;
          cb();
        }, autoResizeDebounce);
      }
    },
    undefined,
    autoResize === false,
  );

  return (
    <div
      {...restProps}
      ref={elRef}
      style={{
        ...restProps.style,
        position: restProps.style?.position ?? 'relative',
      }}
    >
      <div ref={containerCallbackRef} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}></div>
    </div>
  );
});
