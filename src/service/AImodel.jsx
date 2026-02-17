import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON"
        }
      ]
    },
    {
      role: 'model',
      parts: [
        {
          text: `{
  "location": "Las Vegas",
  "duration": "3 Days",
  "budget_category": "Cheap / Budget-Friendly",
  "currency": "USD",
  "hotels": [
    {
      "hotelName": "Luxor Hotel & Casino",
      "address": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
      "price_per_night": "From $45 - $85 (plus resort fees)",
      "hotel_image_url": "https://images.trvl-media.com/hotels/1000000/10000/7400/7331/465f7c35.jpg",
      "geo_coordinates": {
        "latitude": 36.0919,
        "longitude": -115.1761
      },
      "rating": "3.8/5",
      "description": "An iconic pyramid-shaped hotel offering great value. The 'Tower' rooms are recently renovated and offer a more modern experience for couples on a budget."
    },
    {
      "hotelName": "Flamingo Las Vegas Hotel & Casino",
      "address": "3555 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price_per_night": "From $55 - $95 (plus resort fees)",
      "hotel_image_url": "https://www.caesars.com/content/dam/flv/Property/Hotel/flv-hotel-exterior-sunset-1600.jpg",
      "geo_coordinates": {
        "latitude": 36.1165,
        "longitude": -115.1708
      },
      "rating": "3.7/5",
      "description": "Located in the heart of the Strip. It features a tropical 15-acre pool area and a free wildlife habitat with live flamingos, making it a romantic and central budget choice."
    },
    {
      "hotelName": "The LINQ Hotel + Experience",
      "address": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price_per_night": "From $50 - $110 (plus resort fees)",
      "hotel_image_url": "https://www.caesars.com/content/dam/linq/Property/Hotel/linq-hotel-exterior-night-1600.jpg",
      "geo_coordinates": {
        "latitude": 36.1189,
        "longitude": -115.1706
      },
      "rating": "4.1/5",
      "description": "A trendy, modern hotel situated right next to the LINQ Promenade. Perfect for couples who want to be steps away from affordable food and free street entertainment."
    }
  ],
  "itinerary": {
    "day_1": {
      "theme": "Iconic Strip & South End Highlights",
      "best_time_to_visit": "Morning (8:00 AM) to avoid the heat and crowds at the sign.",
      "plan": [
        {
          "placeName": "Welcome to Fabulous Las Vegas Sign",
          "placeDetails": "The classic photo op. Arrive early to avoid the line!",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/82/Welcome_to_Fabulous_Las_Vegas.jpg",
          "geoCoordinates": {
            "latitude": 36.082,
            "longitude": -115.1729
          },
          "ticketPricing": "Free",
          "timeToTravel": "15-20 mins by bus from Center Strip"
        },
        {
          "placeName": "Pinball Hall of Fame",
          "placeDetails": "A huge warehouse of vintage pinball machines. Admission is free, and games only cost 25-50 cents to play.",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/da/Pinball_Hall_of_Fame_Las_Vegas.jpg",
          "geoCoordinates": {
            "latitude": 36.0825,
            "longitude": -115.1719
          },
          "ticketPricing": "Free Entry (Pay-per-play)",
          "timeToTravel": "5 min walk from Las Vegas Sign"
        },
        {
          "placeName": "Fountains of Bellagio",
          "placeDetails": "Watch the choreographed water show set to music. Shows run every 30 mins in afternoon and 15 mins at night.",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Bellagio_Fountains.jpg",
          "geoCoordinates": {
            "latitude": 36.1126,
            "longitude": -115.1741
          },
          "ticketPricing": "Free",
          "timeToTravel": "15 mins by bus (Deuce)"
        }
      ]
    },
    "day_2": {
      "theme": "Tropical Gardens, Venetian Vibes & North Strip",
      "best_time_to_visit": "Evening for the LINQ Promenade and Fremont street lights.",
      "plan": [
        {
          "placeName": "Flamingo Wildlife Habitat",
          "placeDetails": "A peaceful 15-acre garden within the Flamingo hotel featuring flamingos, swans, and koi fish.",
          "placeImageUrl": "https://www.caesars.com/content/dam/flv/Property/Amenities/WildlifeHabitat/flv-wildlife-habitat-flamingos.jpg",
          "geoCoordinates": {
            "latitude": 36.1165,
            "longitude": -115.1708
          },
          "ticketPricing": "Free",
          "timeToTravel": "N/A (Central Strip)"
        },
        {
          "placeName": "Grand Canal Shoppes at The Venetian",
          "placeDetails": "Stroll through the indoor Venice-themed shops and watch the gondolas. Free street performers ('Streetmosphere') perform daily.",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/91/The_Venetian_Las_Vegas_Gondolas.jpg",
          "geoCoordinates": {
            "latitude": 36.1214,
            "longitude": -115.1696
          },
          "ticketPricing": "Free to walk",
          "timeToTravel": "10 min walk from Flamingo"
        },
        {
          "placeName": "LINQ Promenade & High Roller",
          "placeDetails": "An outdoor dining and entertainment district. Great for people-watching and cheap eats like 'In-N-Out' or 'Yard House' happy hour.",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/87/Linq_Promenade_Las_Vegas.jpg",
          "geoCoordinates": {
            "latitude": 36.1179,
            "longitude": -115.17
          },
          "ticketPricing": "Free to walk",
          "timeToTravel": "5 min walk from Venetian"
        }
      ]
    },
    "day_3": {
      "theme": "Downtown & Vintage Vegas",
      "best_time_to_visit": "Night (7:00 PM onwards) to see the Viva Vision light show at Fremont Street.",
      "plan": [
        {
          "placeName": "Downtown Container Park",
          "placeDetails": "An open-air shopping center made of shipping containers. Don't miss the fire-breathing Preying Mantis at the entrance at sunset.",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Container_Park_Las_Vegas.jpg",
          "geoCoordinates": {
            "latitude": 36.1681,
            "longitude": -115.1384
          },
          "ticketPricing": "Free",
          "timeToTravel": "15-20 mins by bus (Deuce) from Strip"
        },
        {
          "placeName": "Fremont Street Experience",
          "placeDetails": "Old Vegas at its best. Enjoy free nightly concerts and the world's largest LED canopy light show (Viva Vision).",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Fremont_Street_Experience_Night.jpg",
          "geoCoordinates": {
            "latitude": 36.1708,
            "longitude": -115.144
          },
          "ticketPricing": "Free",
          "timeToTravel": "5 min walk from Container Park"
        },
        {
          "placeName": "Gold & Silver Pawn Shop",
          "placeDetails": "Visit the world-famous shop from the 'Pawn Stars' TV show. Entry is free to the public.",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/05/Gold_%26_Silver_Pawn_Shop_Las_Vegas.jpg",
          "geoCoordinates": {
            "latitude": 36.1618,
            "longitude": -115.1408
          },
          "ticketPricing": "Free",
          "timeToTravel": "10 min walk from Fremont Street"
        }
      ]
    }
  ],
  "budget_tips": [
    {
      "tip": "Use the Deuce Bus",
      "detail": "Avoid expensive Taxis/Uber. A 24-hour pass for the Deuce bus is roughly $8 and runs the entire length of the Strip to Downtown 24/7."
    },
    {
      "tip": "Cheap Eats",
      "detail": "Look for 'Ocean One' at Miracle Mile Shops ($5 lunch specials) or 'Tacos El Gordo' for authentic, affordable street tacos."
    },
    {
      "tip": "Free Drinks",
      "detail": "If you are gambling (even on penny slots), drinks are complimentary. Just remember to tip your server $1-2 per drink."
    }
  ]
}`
        }
      ]
    },
  ],
});