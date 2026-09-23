import type {Note} from "../types/Note";

export const notes: Note[] = [
    {
        id: 1,
        title: "Ciąg arytmetyczny",
        slug: "ciag-arytmetyczny",
        categorySlug: "ciagi",
        files: ["/CiagArytmetyczny.pdf"],
        keywords: [
            "wzór",
            "suma",
            "rekurencyjny",
            "rekurencja",
            "an",
        ]
    },
    {
        id: 2,
        title: "Ciąg geometryczny",
        slug: "ciag-geometryczny",
        categorySlug: "ciagi",
        files: ["/CiagGeometryczny.pdf"],
    },
    {
        id: 3,
        title: "Granica",
        slug: "granica",
        categorySlug: "ciagi",
        files: ["/Granica.pdf", "/Granica2.pdf"],
    },
    {
        id: 4,
        title: "Szereg",
        slug: "szereg",
        categorySlug: "ciagi",
        files: ["/Szereg.pdf"],
    }
]