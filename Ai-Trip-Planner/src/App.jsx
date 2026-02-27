import { Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"

import Hero from "./components/custom/Hero"
import CreateTrip from "./create-trip"

function App() {
  return (
    <div className="min-h-screen">
      {/* 🔥 Toaster must be OUTSIDE Routes and stable */}
      <Toaster
        position="bottom-left"
        richColors
        closeButton
      />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </div>
  )
}

export default App
