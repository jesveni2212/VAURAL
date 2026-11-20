/** 1 → "01": counters and step numbers. */
export function padNumber(value: number): string {
  return String(value).padStart(2, "0");
}
