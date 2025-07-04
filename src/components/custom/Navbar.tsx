import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router"; 

const Navbar = () => {
  const navLinks = [
    { name: "All Books", path: "/books" },
    { name: "Add Book", path: "/create-book" },
    { name: "Borrow Summary", path: "/borrow-summary" },
  ];

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Book<span className="text-accent">Pick</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
         <NavLink
  key={link.path}
  to={link.path}
  className={({ isActive }) =>
    `text-base font-medium transition ${
      isActive ? "text-primary" : "text-muted-foreground"
    } hover:text-primary`
  }
>
  {link.name}
</NavLink>

          ))}
        </nav>

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white">
              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
              <NavLink
  key={link.path}
  to={link.path}
  className={({ isActive }) =>
    `text-base font-medium transition ${
      isActive ? "text-primary" : "text-muted-foreground"
    } hover:text-primary`
  }
>
  {link.name}
</NavLink>

                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
