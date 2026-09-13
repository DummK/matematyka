import type { CategorySlug} from "./Category";

export type NoteTitle = 'Ciąg arytmetyczny' | 'Ciąg geometryczny' | 'Granica' | 'Granica 2' | 'Szereg'
type NoteSlug = 'ciag-arytmetyczny' | 'ciag-geometryczny' | 'granica' | 'granica-2' | 'szereg'

export type Note = {
    id: number;
    title: NoteTitle;
    slug: NoteSlug;
    categorySlug: CategorySlug;
    files: string[];
    keywords?: string[];
}