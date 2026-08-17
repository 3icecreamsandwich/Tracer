import { describe, expect, it } from "vitest";

import { formatMatchTime, MATCH_DURATION_MS } from "../../src/composables/match/timer";

describe("match timer", () => {
    it("formats elapsed time with millisecond precision", () => {
        expect(formatMatchTime(0)).toBe("00:00.000");
        expect(formatMatchTime(1_234)).toBe("00:01.234");
        expect(formatMatchTime(61_999)).toBe("01:01.999");
    });

    it("clamps negative elapsed time to zero", () => {
        expect(formatMatchTime(-10)).toBe("00:00.000");
    });

    it("uses a ten-minute match limit", () => {
        expect(MATCH_DURATION_MS).toBe(600_000);
    });
});
