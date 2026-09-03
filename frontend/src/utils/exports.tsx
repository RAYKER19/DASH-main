export type ExportFormat = 'pdf' | 'jpg' | 'csv' | 'excel';

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportRows(rows: string[][], format: ExportFormat, filename: string) {
  if (format === 'pdf') {
    window.print();
    return;
  }
  if (format === 'csv') {
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n');
    download(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `${filename}.csv`);
    return;
  }
  if (format === 'excel') {
    const table = `<table>${rows.map((row) => `<tr>${row.map((value) => `<td>${value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</td>`).join('')}</tr>`).join('')}</table>`;
    download(new Blob([`<html><meta charset="utf-8"><body>${table}</body></html>`], { type: 'application/vnd.ms-excel' }), `${filename}.xls`);
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = Math.max(240, rows.length * 36 + 80);
  const context = canvas.getContext('2d');
  if (!context) return;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#173f33';
  context.font = 'bold 24px sans-serif';
  context.fillText(filename, 32, 42);
  context.font = '16px sans-serif';
  rows.forEach((row, rowIndex) => {
    const y = 78 + rowIndex * 36;
    context.fillStyle = rowIndex === 0 ? '#e9f2ee' : '#1b1d1c';
    context.fillRect(24, y - 24, canvas.width - 48, 30);
    context.fillStyle = '#1b1d1c';
    row.forEach((value, columnIndex) => context.fillText(value.slice(0, 40), 36 + columnIndex * 260, y - 4));
  });
  canvas.toBlob((blob) => { if (blob) download(blob, `${filename}.jpg`); }, 'image/jpeg', 0.92);
}

export function ExportMenu({ onExport }: { onExport: (format: ExportFormat) => void }) {
  return <select className="export-select" defaultValue="" onChange={(event) => { if (event.target.value) onExport(event.target.value as ExportFormat); event.target.value = ''; }} aria-label="Formato de exportación">
    <option value="">Exportar...</option>
    <option value="pdf">PDF</option>
    <option value="jpg">JPG</option>
    <option value="csv">CSV</option>
    <option value="excel">Excel</option>
  </select>;
}
