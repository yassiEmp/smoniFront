import { lazy, type ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>;

// Wrap React.lazy() so aborted/failed chunk fetches retry with backoff
// instead of bubbling a ChunkLoadError into Suspense. When the user
// spam-refreshes during initial load, in-flight chunk requests get
// cancelled — React 19 then treats that as a hydration failure and
// appends a fresh client render as a sibling of the SSG content,
// producing the visible "page renders twice" duplication.
//
// Retry strategy: up to 2 retries with 200ms / 600ms delays. If all
// retries fail (genuine network/build issue, not an aborted fetch),
// fall through to React's error path so the boot-time guard in
// main.tsx can detect the stacked state and trigger a hard reload.
export function lazyWithRetry<T extends AnyComponent>(
  factory: () => Promise<{ default: T }>,
): ReturnType<typeof lazy<T>> {
  return lazy(() =>
    factory().catch((err) =>
      new Promise<{ default: T }>((resolve, reject) => {
        setTimeout(() => {
          factory()
            .then(resolve)
            .catch(() => {
              setTimeout(() => {
                factory().then(resolve).catch(() => reject(err));
              }, 600);
            });
        }, 200);
      }),
    ),
  );
}
