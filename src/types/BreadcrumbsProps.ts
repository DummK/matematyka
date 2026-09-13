import type {CategoryTitle} from "./Category";
import type { CategorySlug } from "./Category";
import type { NoteTitle} from "./Note";

export type BreadcrumbsProps = {
    categoryTitle: CategoryTitle;
    categorySlug: CategorySlug;
    noteTitle?: NoteTitle;
}