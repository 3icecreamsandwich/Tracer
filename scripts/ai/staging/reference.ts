// Compare the synthetic probe's chemistry after presentation normalization.
// This never participates in production grading or changes an AI response.
export function containsWaterFormula(text:string):boolean {
 const plain=text.normalize('NFKC').replace(/<\/?sub>/gi,'').replace(/\\[a-z]+/gi,'').replace(/[_{}\s$]/g,'')
 return /H2O/i.test(plain)
}
