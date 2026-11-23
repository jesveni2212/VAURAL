import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "./json-ld";

describe("serializeJsonLd", () => {
  it("cannot close the surrounding <script> tag", () => {
    const data = { name: "</script><script>alert(1)</script>" };

    const json = serializeJsonLd(data);

    expect(json).not.toContain("</script>");
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual(data);
  });
});
