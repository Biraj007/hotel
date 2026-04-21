# ADB Kanvas Hotels & Resorts 🏨✨

A premium, high-performance website developed for **ADB Kanvas Hotels & Resorts**, showcasing luxury hospitality across two premier destinations: **Mandarmani (Beach Resort)** and **Lataguri (Jungle Resort)**.

---

## 🌟 Overview

This project is a fully responsive, SEO-optimized web application designed to provide a seamless booking and exploration experience for travelers. It features a modern design aesthetic, fast-loading assets, and a clean architecture.

> **Project History**: Developed for ADB Kanvas during my tenure at FFACE. The codebase has since been refactored for modern structural standards and optimized asset management.

---

## 🚀 Key Features

- **Static Component Generation**: Python-based build script (`build.py`) automatically injects shared header/footer components across 30+ pages and dynamically fixes relative paths.
- **Location-Based Routing**: Dedicated sections for both Mandarmani and Lataguri with standardized navigation.
- **Room Management**: Organized folder structure for luxury rooms and cottages, ensuring clean URLs and better SEO.
- **SEO Ready**: 
  - Auto-generated `sitemap.xml` on every build.
  - Validated `robots.txt`.
  - Optimized Meta Tags and Canonical URLs.
  - High-performance WebP image compression.
- **Premium UI/UX**:
  - Smooth carousels and interactive galleries.
  - Transparent sticky headers and mobile-first navigation.
  - Integrated Font Awesome 5 brand iconography.
- **Contact Integration**: Custom-built PHP contact form with automatic email handling.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (Minified), JavaScript |
| **Framework** | Bootstrap 4.6 |
| **Icons** | Font Awesome 5 & Themify Icons |
| **Assets** | WebP Compression, Lazy-Loading |
| **Scripts** | jQuery, Owl Carousel, Lightbox |
| **Backend** | PHP (Contact Processing) |
| **Build Tools** | Python (`build.py` for Static Component Generation) |

---

## 📂 Project Structure

```text
/
├── components/         # Shared HTML templates (Header/Footer)
├── build.py            # Python script to inject components & generate sitemap
├── mandarmani/         # Mandarmani Beach Resort pages & activities
│   └── rooms/          # Individual luxury room pages
├── lataguri/           # Lataguri Jungle Resort pages & activities
│   └── rooms/          # Individual room and cottage pages
├── blogs/              # SEO-rich hospitality blogs
├── img/                # Optimized asset directory
├── css/                # Minified site stylesheets
├── vendors/            # External libraries and icon fonts
└── .htaccess           # Advanced server rules & 301 redirects
```

---

## 📈 SEO & Performance

The repository includes a comprehensive `.htaccess` file configured with:
- **301 Redirects**: Ensures legacy URL continuity after structural refactoring.
- **Gzip Compression**: Optimized server response times.
- **Browser Caching**: 1-year cache headers for static assets (images, fonts).
- **SSL Enforcement**: Automatic HTTPS redirect for security.

---

## 👨‍💻 Author & Credits

- **Developer**: [Biraj Naskar](https://www.linkedin.com/in/biraj-naskar)
- **Original Agency**: Developed under **FFACE** for the client **ADB Kanvas**.

---

## 📄 License

This project is the property of **ADB Kanvas**. It is maintained here for portfolio and archival purposes.
