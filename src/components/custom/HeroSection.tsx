import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import bgimage from "@/assets/hero.jpg"; 

const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/80 to-black/60 z-0" />

      <div className="relative z-10 text-center px-4 max-w-2xl text-white space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome to <span className="text-[#FCA311]">BookPick</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Discover, manage, and track your favorite library books in one place.
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 w-full max-w-md mx-auto mt-4">
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN"
            className="bg-white text-black rounded-full px-4"
          />
          <Button variant="default" className="rounded-full px-5 bg-[#FCA311] hover:bg-[#e4940f] text-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
