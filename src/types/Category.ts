type CategoryTitle = 'Ciągi' | 'Kombinatoryka' | 'Czworokąty' | 'Geometria płaska' | 'Analiza matematyczna' | 'Trygonometria' | 'Geometria analityczna';
type CategorySlug = 'ciagi' | 'kombinatoryka' | 'czworokaty' | 'geometria-plaska' | 'analiza-matematyczna' | 'trygonometria' | 'geometria-analityczna';

export type Category = {
    id: number;
    title: CategoryTitle;
    slug: CategorySlug;
}
