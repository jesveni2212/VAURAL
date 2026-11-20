const COMPACT_AFTER_PX = 24;
const HIDE_AFTER_PX = 640;

export type HeaderState = { compact: boolean; hidden: boolean };

/**
 * Floats into a pill once the page moves; slips away while reading down far, returns on the way up.
 * `pinned` (menu open or keyboard focus inside) keeps it on screen.
 */
export function headerState(y: number, previousY: number, pinned: boolean): HeaderState {
  return {
    compact: y > COMPACT_AFTER_PX,
    hidden: !pinned && y > HIDE_AFTER_PX && y > previousY,
  };
}
