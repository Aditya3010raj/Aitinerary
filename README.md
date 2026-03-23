# 🌍 Aitinerary: AI-Powered Travel Architect

Aitinerary is a full-stack, intelligent travel planning platform that transforms vague travel desires into high-precision, day-wise itineraries. Built with **Next.js 14**, it leverages the **Gemini 1.5 Flash** model to handle complex constraints like budget, group size, and destination-specific logistics.

## 🏗️ Architecture & Logic Flow
1. **User Input:** Structured form collecting destination, duration, budget tier, and traveler type.
2. **AI Orchestration:** Prompt engineering sends a structured request to the **Gemini API**, enforcing a strict JSON schema response.
3. **Data Enrichment:** The app parses the AI response and cross-references the **Google Places API** to fetch high-resolution imagery and specific coordinates for every suggested spot.
4. **Persistence:** Trip data is serialized and stored in **Firebase Firestore**, indexed by User ID for instant retrieval.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript
- **AI Model:** Google Gemini 3 Flash Preview
- **Database & Auth:** Firebase (Firestore & Google Auth)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Data Fetching:** Axios & TanStack Query (for Places API caching)

## 🚀 Key Features & Implementation Details
- **Dynamic JSON Parsing:** Implemented robust error handling to manage "hallucinations" or malformed JSON strings from the LLM.
- **Smart Image Mapping:** A custom utility function that maps Place IDs to photo references, ensuring every itinerary is visually rich.
- **Budget-Aware Logic:** The AI is tuned to categorize activities into "Cheap," "Moderate," and "Luxury" tiers based on real-time-like heuristics.
- **Responsive Itinerary View:** A vertical timeline UI that adapts from desktop grids to mobile-first single-column lists.

## 📦 Installation
```bash
git clone [https://github.com/Aditya3010raj/aitinerary.git](https://github.com/Aditya3010raj/aitinerary.git)
cd aitinerary
npm install
