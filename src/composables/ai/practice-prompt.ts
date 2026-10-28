export function buildLearnAugmentPrompt(args: {
    title: string;
    description: string | null;
    terms: { front: string; back: string }[];
    count: number;
}) {
    const descLine = args.description?.trim()
        ? `Description: ${args.description.trim()}\n`
        : "";
    const tsvLines = args.terms
        .map(
            (t) =>
                `${String(t.front).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim()}\t${String(t.back).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim()}`,
        )
        .join("\n");

    return [
        "You are generating extra study questions for a flashcard deck.",
        "Return ONLY JSON (no markdown, no prose).",
        "",
        "Schema:",
        '{"questions":[{"kind":"true_false","term":"...","definition":"...","answer":true}|{"kind":"multiple_choice","term":"...","choices":["...","...","...","..."],"answerIndex":0}]}',
        "",
        `Count: ${args.count}`,
        "",
        `Set title: ${args.title}`,
        descLine.trimEnd(),
        "",
        "Deck (TSV: term<TAB>definition):",
        tsvLines,
    ]
        .filter((x) => x.length > 0)
        .join("\n");
}

