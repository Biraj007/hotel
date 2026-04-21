import os, glob, re

def build_site():
    print("Building site...")
    
    with open('components/header.html', 'r', encoding='utf-8') as f:
        header_template = f.read()
    with open('components/footer.html', 'r', encoding='utf-8') as f:
        footer_template = f.read()

    files = glob.glob('*.html') + glob.glob('*/*.html') + glob.glob('*/*/*.html')
    
    header_pattern = re.compile(r'<header[^>]*>.*?</header>', re.DOTALL | re.IGNORECASE)
    footer_pattern = re.compile(r'<footer[^>]*>.*?</footer>', re.DOTALL | re.IGNORECASE)

    count = 0
    for f in files:
        f_normalized = f.replace('\\', '/')
        if f_normalized.startswith('components/') or f_normalized.startswith('vendors/'):
            continue

        depth = f_normalized.count('/')
        base_url = "../" * depth if depth > 0 else ""
        
        basename = os.path.basename(f).replace('.html', '')
        
        # Calculate active states
        active_home = 'active' if basename == 'index' else ''
        active_contact = 'active' if basename == 'contact' else ''
        active_about = 'active' if basename == 'about-us' else ''
        active_gallery = 'active' if basename == 'gallery' else ''
        active_blog = 'active' if basename == 'blog' or '/blogs/' in f_normalized else ''
        active_mandarmani = 'active' if 'mandarmani' in f_normalized else ''
        active_lataguri = 'active' if 'lataguri' in f_normalized else ''
        
        # Parse header
        parsed_header = header_template.replace('{{base_url}}', base_url)
        parsed_header = parsed_header.replace('{{active_home}}', active_home)
        parsed_header = parsed_header.replace('{{active_contact}}', active_contact)
        parsed_header = parsed_header.replace('{{active_about}}', active_about)
        parsed_header = parsed_header.replace('{{active_gallery}}', active_gallery)
        parsed_header = parsed_header.replace('{{active_blog}}', active_blog)
        parsed_header = parsed_header.replace('{{active_mandarmani}}', active_mandarmani)
        parsed_header = parsed_header.replace('{{active_lataguri}}', active_lataguri)
        
        # Parse footer
        parsed_footer = footer_template.replace('{{base_url}}', base_url)
        
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        new_content = header_pattern.sub(parsed_header, content)
        new_content = footer_pattern.sub(parsed_footer, new_content)
        
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            count += 1
            
    print(f"Successfully injected header and footer into {count} files.")

if __name__ == '__main__':
    build_site()
