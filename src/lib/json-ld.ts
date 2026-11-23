/** JSON for a `<script type="application/ld+json">`: escapes "<" so no value can ever close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
