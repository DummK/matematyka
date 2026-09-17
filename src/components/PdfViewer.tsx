import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

type PdfViewerProps = {
    fileName: string;
}


function PdfViewer(props: PdfViewerProps) {
    const { fileName } = props;

    return (
        <Document file={fileName}>
            <Page pageNumber={1} />
        </Document>
    )
}

export default PdfViewer;