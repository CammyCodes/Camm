import CammBot from '@/components/ui/CammBot';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-bg border-t border-line px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-ink-soft font-sans">
        
        {/* Left Column Section */}
        <div className="flex items-center gap-3">
          <CammBot pose="idle" className="w-10 h-10 shrink-0" />
          <span className="font-medium">Built by Ethan Camm</span>
        </div>

        {/* Centre Mailto Block */}
        <div>
          <a 
            href="mailto:ethan@ethancamm.co.uk" 
            className="hover:text-accent underline underline-offset-4 font-medium transition-colors"
          >
            ethan@ethancamm.co.uk
          </a>
        </div>

        {/* Right Compliance Year Output Section */}
        <div className="font-mono text-muted text-xs">
          © {currentYear}
        </div>

      </div>
    </footer>
  );
}