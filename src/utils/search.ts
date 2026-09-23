import type {Note} from "../types/Note";
import type {SearchResult} from "../types/SearchResult";

export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
export function wordsMatch(queryWord: string, targetWord: string): boolean {
    if (targetWord.includes(queryWord)) {
        return true;
    }

    const allowedErrors = queryWord.length >= 7 ? 2 : 1;

    return levenshteinDistance(queryWord, targetWord) <= allowedErrors;
}
export function searchNotes(query: string, notes: Note[]): SearchResult[]{
    const normalizedQuery = normalizeText(query);

    if(!normalizedQuery) return [];

    const results: SearchResult[] = [];

    notes.filter((note) => {
        const normalizedTitle = normalizeText(note.title);
        const normalizedSlug = normalizeText(note.slug);
        const normalizedKeywords = note.keywords?.map((keyword) => {
            return normalizeText(keyword);
        }) ?? [];


        let score = 0;
        let matchedBy: SearchResult["matchedBy"] | undefined;

        if(normalizedTitle === normalizedQuery) {
            score = 100;
            matchedBy = "title"
        }
        else if(normalizedTitle.includes(normalizedQuery)) {
            score = 80;
            matchedBy = "title"
        }
        else if(    normalizedKeywords.some((keyword) =>
                    keyword.includes(normalizedQuery))
                ){
            score = 60;
            matchedBy = "keyword"
        }
        else if (normalizedSlug.includes(normalizedQuery)) {
            score = 40;
            matchedBy = "slug";
        }
        else {
            const queryWords = normalizedQuery.split(" ");
            const titleWords = normalizedTitle.split(" ");

            const fuzzyMatch = queryWords.every((queryWord) => {
                return titleWords.some((titleWord) => {
                    return wordsMatch(queryWord, titleWord);
                });
            });

            if (fuzzyMatch) {
                score = 30;
                matchedBy = "title";
            }
        }

        if(score > 0 && matchedBy){
            results.push({
                note,
                score,
                matchedBy,
            })
        }
    })
    return results.sort((a, b) => b.score - a.score);
}

function levenshteinDistance(first: string, second: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= second.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= first.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= second.length; i++) {
        for (let j = 1; j <= first.length; j++) {
            if (second[i - 1] === first[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[second.length][first.length];
}