from pypdf import PdfReader

paths = [
    r'C:\Users\DAVID\Downloads\Prueba\DASH-main\Guia_SciPy_NLTK_Produccion_Web_Empresarial.pdf',
    r'C:\Users\DAVID\Downloads\Prueba\DASH-main\SciPy_NLTK_Produccion.pdf',
]

for path in paths:
    print('\n===== ' + path + ' =====')
    try:
        reader = PdfReader(path)
        text = '\n'.join(page.extract_text() or '' for page in reader.pages)
        print(text[:10000])
    except Exception as e:
        print('ERROR', type(e).__name__, e)
    print('\n===== END =====\n')
