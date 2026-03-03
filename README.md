# 🎬 AI Movie Insight Platform

An AI-powered movie analysis platform that fetches movie details and real audience reviews, then generates intelligent summaries and sentiment insights using **Google Gemini AI**.

---

## 🌐 Live Demo

🔗 **Live URL:**  
https://movies-insight.vercel.app/

---


<p align="center">
  <img src="./screenshots/ai-summary.png" width="800" />
</p>


## 🚀 Features

- 🔍 Search movies by title or IMDb ID
- 🎬 Fetch detailed movie information (OMDb API)
- 💬 Fetch real user reviews (TMDB API)
- 🤖 AI-generated review summary (Gemini)
- 📊 Sentiment classification (Positive / Negative)
- 📈 Positive vs Negative percentage score
- 🏷 Extraction of key discussion themes
- ⚡ Optimized data fetching using React Query
- 🎨 Fully responsive modern UI with Tailwind CSS

---

## 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js 14 (App Router), React |
| Styling | Tailwind CSS |
| State/Data | React Query |
| Movie Data | OMDb API |
| Reviews | TMDB API |
| AI | Google Gemini |
| Backend | Next.js API Routes |

---

## 🔑 API Keys Required

You need the following API keys:

### 1️⃣ OMDb API Key  
Get it from:  
https://www.omdbapi.com/apikey.aspx  

### 2️⃣ TMDB API Key  
Get it from:  
https://www.themoviedb.org/settings/api  

### 3️⃣ Gemini API Key  
Get it from:  
https://aistudio.google.com/app/apikey  

---

## ⚙️ Environment Variables

Create a `.env.local` file in your project root:

```env
OMDB_API_KEY=your_omdb_key_here
TMDB_API_KEY=your_tmdb_key_here
GEMINI_API_KEY=your_gemini_key_here

