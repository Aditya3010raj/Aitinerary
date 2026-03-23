# 🌍 Aitinerary: AI-Powered Travel Architect

**Live Demo:** [aitinerary-path.vercel.app](aitinerary-beta.vercel.app)  
**Author:** [Adityaraj Chatterjee](https://github.com/Aditya3010raj)

---

Aitinerary is a full-stack, intelligent travel planning platform that transforms vague travel desires into high-precision, day-wise itineraries. Built with **Next.js 14**, it leverages the **Gemini 1.5 Flash** model to handle complex constraints like budget, group size, and destination-specific logistics.

## 🔗 Project Links
- **Live Deployment:** [View Live App](https://aitinerary-path.vercel.app)
- **GitHub Repository:** [Source Code](https://github.com/Aditya3010raj/aitinerary)
- **Documentation:** [Wiki/Docs](https://github.com/Aditya3010raj/aitinerary/wiki)

## 🏗️ Architecture & Logic Flow
1. **User Input:** Structured form collecting destination, duration, budget tier, and traveler type.
2. **AI Orchestration:** Prompt engineering sends a structured request to the **Gemini API**, enforcing a strict JSON schema response.
3. **Data Enrichment:** The app parses the AI response and cross-references the **Google Places API** to fetch high-resolution imagery and specific coordinates.
4. **Persistence:** Trip data is serialized and stored in **Firebase Firestore**, indexed by User ID.

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **AI Model:** Google Gemini 1.5 Flash
- **Database & Auth:** Firebase (Firestore & Google Auth)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Data Fetching:** Axios & TanStack Query

## 🚀 Key Features
- **Dynamic JSON Parsing:** Robust error handling to manage "hallucinations" or malformed JSON from the LLM.
- **Smart Image Mapping:** Custom utility mapping Place IDs to photo references.
- **Budget-Aware Logic:** Categorizes activities into "Cheap," "Moderate," and "Luxury" tiers.

## 📦 Installation & Setup
1. **Clone the repo:** `git clone https://github.com/Aditya3010raj/aitinerary.git`
2. **Install deps:** `npm install`
3. **Local Preview:** `npm run dev`
