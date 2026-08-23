export const MATCH_DURATION_MS = 10 * 60 * 1000;

export function formatMatchTime(elapsedMs: number): string {
    const totalMs = Math.max(0, Math.floor(elapsedMs));
    const minutes = Math.floor(totalMs / 60_000);
    const seconds = Math.floor(totalMs / 1_000) % 60;
    const milliseconds = totalMs % 1_000;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
}
