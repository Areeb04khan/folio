const Footer = () => (
  <footer className="py-8 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Areeb Khan. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/areeb4khan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        <a href="https://github.com/Areeb04khan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
        <a href="mailto:areeb4khan@gmail.com" className="hover:text-primary transition-colors">Email</a>
      </div>
    </div>
  </footer>
);

export default Footer;
