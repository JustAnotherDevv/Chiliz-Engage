import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation";
import { Home } from "@/pages/home";
import { Challenges } from "@/pages/challenges";
import { Profile } from "@/pages/profile";
import { Leaderboard } from "@/pages/leaderboard";
import { Community } from "@/pages/community";
import { CreateChallenge } from "@/pages/create-challenge";
import { ChallengeDetail } from "@/pages/challenge-detail";
import AppHome from "./pages/app-home";
import Landing from "./pages/landing";
import Hero from "./components/hero";
import Explore from "./pages/explore";
import SportsClubPage from "./pages/club";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="fitchilliz-theme">
      <Router>
        {/* <div className="w-screen min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"> */}
        <div className="w-screen min-h-screen bg-black">
          {/* <Navigation /> */}
          {/* <main className="container mx-auto px-4 py-8"> */}
          <main className=" w-screen">
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <>
                <Route path="/" element={<SportsClubPage />} />

                {/* <Route path="/" element={<Explore />} /> */}
                {/* <Route path="/" element={<Hero />} /> */}
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/challenges/:id" element={<ChallengeDetail />} />
                <Route path="/create-challenge" element={<CreateChallenge />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/community" element={<Community />} />
              </>
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
