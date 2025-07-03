const Footer = () => {
  return (
    <footer className="border-t bg-muted text-muted-foreground mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left: Logo or site name */}
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-primary">BookPick</span>. All rights reserved.
        </div>

        {/* Right: Developer credit */}
        <div className="text-center md:text-right">
          Made with ❤️ by <a href="https://faysal-sarker.netlify.app" target="_blank" className="underline hover:text-primary">Faysal Sarker</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
