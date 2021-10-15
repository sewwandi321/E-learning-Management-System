import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DownloadButton(props) {
    const exportPDF = () => {
        const unit = 'pt';
        const size = 'A4'; // Use A1, A2, A3 or A4
        const orientation = 'portrait'; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(16);

        const title = props.title;
        const headers = props.headers;

        const data = props.data;

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(props.fileName);
    };

    return (
        <button type="button" className="btn btn-primary" onClick={() => exportPDF()}>
            Download
        </button>
    );
}

export default DownloadButton;
