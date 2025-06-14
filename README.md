# 🧠 Quant Daily – Aakash's Quant & Markets Blog

> Your one-stop hub for financial insights, commodity news, and market commentary — powered by markdown & open submissions.

![Banner](https://user-images.githubusercontent.com/your-placeholder/banner.png)

---

## ✨ Features

- 📝 **Aakash's Daily Quant Insights** — Handwritten updates on commodities and financial markets.
- 🌍 **Community Posts** — Anyone can write and submit posts via a public page (no login needed).
- ⚙️ **Powered by Sanity Headless CMS** — Rich content editing, easy scalability.
- 🌐 **Modern Frontend** — Built with Next.js 14 App Router and styled with Tailwind CSS.
- 📬 **No-auth Publishing** — Users just write a name and content, and hit publish.
- 🔍 **Fast, SEO-Friendly, Clean UI** — Designed for clarity and impact.

---

## 🏗️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js](https://nextjs.org) | Frontend framework (App Router) |
| [Sanity.io](https://sanity.io) | Backend CMS & content store |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [GROQ](https://www.sanity.io/docs/groq) | Query language for Sanity |
| Markdown & Portable Text | Rich content formatting |

---

## 📁 Project Structure

```bash
/quant-blog-project
├── /studio            # Sanity Studio (CMS backend)
│   └── /schemas       # Post schema, content config
├── /frontend          # Next.js frontend
│   ├── /app           # Routing pages (/write, /community, /post/[slug])
│   ├── /components    # UI blocks like PostCard, RichText
│   ├── /lib           # Sanity client & GROQ queries
│   └── /pages/api     # API route to submit posts
