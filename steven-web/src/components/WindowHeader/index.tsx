import { useCallback, useEffect, useState } from "react";
import { WINDOW_HEADER } from "./const";
import type { WindowHeaderProps } from "./types";

function WindowHeader({ desktopApi }: WindowHeaderProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const unsubscribe = desktopApi.window.onMaximizedChange((maximized) => {
      setIsMaximized(maximized);
    });

    void desktopApi.window
      .isMaximized()
      .then((maximized) => {
        setIsMaximized(maximized);
      })
      .catch(() => {
        setIsMaximized(false);
      });

    return unsubscribe;
  }, [desktopApi]);

  const handleDoubleClick = useCallback(() => {
    if (isMaximized) {
      desktopApi.window.unmaximize();
      return;
    }

    desktopApi.window.maximize();
  }, [desktopApi, isMaximized]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-20 flex h-10 select-none items-center justify-center border-b border-slate-500/20 bg-transparent pl-21 pr-35 [app-region:drag] [-webkit-app-region:drag]"
      onDoubleClick={handleDoubleClick}
    >
      <p className="pointer-events-none m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem] font-semibold tracking-[0.01em] text-gray-600">
        {WINDOW_HEADER.TITLE}
      </p>
    </header>
  );
}

export default WindowHeader;
