import React, { forwardRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import PageShell from '../components/PageShell.jsx';
import BrochureForm from '../components/brochure/BrochureForm.jsx';
import BrochureLivePreview from '../components/brochure/BrochureLivePreview.jsx';
import { BrochurePrintFlat } from '../components/brochure/BrochurePageContent.jsx';
import { defaultBrochureData } from '../data/defaultBrochureData.js';

const BrochurePage = forwardRef((props, ref) => {
  const [brochureData, setBrochureData] = useState(defaultBrochureData);

  const handleDownloadPDF = () => {
    const element = ref.current;
    if (!element) return;
    const opt = {
      margin: 0,
      filename: 'Nana_Okru-Baah_V_Funeral_Program.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <PageShell
      compact
      title="Memorial Brochure"
      subtitle="Content auto-paginates into flip pages with a table of contents."
      actions={
        <button type="button" className="btn-primary" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      }
    >
      <div className="brochure-editor">
        <div className="brochure-preview-panel">
          <BrochureLivePreview data={brochureData} />
        </div>
        <BrochureForm data={brochureData} onChange={setBrochureData} />
      </div>

      <div ref={ref}>
        <BrochurePrintFlat data={brochureData} />
      </div>
    </PageShell>
  );
});

BrochurePage.displayName = 'BrochurePage';

export default BrochurePage;
