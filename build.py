import os, glob, re, datetime

def generate_sitemap(files):
    print("Generating sitemap.xml...")
    base_url = "https://www.adbkanvas.com/"
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    
    for f in files:
        f_norm = f.replace('\\', '/')
        if f_norm.startswith('components/') or f_norm.startswith('vendors/'):
            continue
        if f_norm == '404.html':
            continue
            
        # Determine priority based on page type
        priority = "0.8"
        if f_norm == "index.html": priority = "1.0"
        elif "rooms" in f_norm: priority = "0.9"
        elif "activities" in f_norm or "services" in f_norm: priority = "0.8"
        elif "blog" in f_norm: priority = "0.7"
        
        # Determine URL
        url = base_url + f_norm if f_norm != "index.html" else base_url
        
        xml += f'  <url>\n    <loc>{url}</loc>\n    <lastmod>{today}</lastmod>\n    <priority>{priority}</priority>\n  </url>\n'
        
    xml += '</urlset>'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as sf:
        sf.write(xml)
    print("Successfully generated sitemap.xml!")

def build_site():
    print("Building site...")
    
    with open('components/header.html', 'r', encoding='utf-8') as f:
        header_template = f.read()
    with open('components/footer.html', 'r', encoding='utf-8') as f:
        footer_template = f.read()

    files = glob.glob('*.html') + glob.glob('*/*.html') + glob.glob('*/*/*.html')
    
    # Generate Sitemap automatically!
    generate_sitemap(files)
    
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
        
        # Quick fix to make JS script paths relative so they work locally!
        if depth > 0:
            new_content = new_content.replace('src="/js/', f'src="{base_url}js/')
            new_content = new_content.replace('src="/vendors/', f'src="{base_url}vendors/')
        
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            count += 1
            
    print(f"Successfully injected header and footer into {count} files.")

if __name__ == '__main__':
    build_site()
