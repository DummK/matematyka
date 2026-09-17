import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

type PdfViewerProps = {
    fileName: string;
};

function PdfViewer(props: PdfViewerProps) {
    const { fileName } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];

            setContainerWidth(entry.contentRect.width);
        });

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="pdf-renderer">
            <Document file={fileName}>
                {
                    containerWidth > 0 && (
                        <Page
                            pageNumber={1}
                            width={containerWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    )
                }
            </Document>
        </div>
    );
}

export default PdfViewer;