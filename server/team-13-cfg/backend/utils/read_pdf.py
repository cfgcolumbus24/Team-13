import PyPDF2

def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() or ''  # Handle pages with no text
        return text

file_path = 'pathways.pdf'  # Adjust to your PDF file path
text = extract_text_from_pdf(file_path)
print(text)
