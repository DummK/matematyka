import type {Note} from "./Note";

export type SearchResult = {
    note: Note;
    score: number;
    matchedBy: "title" | "keyword"| "slug";
}