import Link from 'next/link';
import { ArrowLeft, Building } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full border border-construction-orange/40 bg-construction-orange/10 flex items-center justify-center mb-6">
        <Building className="w-8 h-8 text-construction-orange" />
      </div>
      <span className="text-xs font-mono tracking-widest text-construction-orange uppercase mb-2">
        ERROR 404 // STRUCTURE NOT FOUND
      </span>
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
        OUT OF BOUNDS
      </h1>
      <p className="text-sm text-neutral-400 max-w-md mb-8 font-light">
        The architectural blueprint or coordinate you are looking for has not been constructed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded bg-construction-orange text-black font-bold uppercase tracking-widest text-xs hover:bg-construction-orange-light transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Tower</span>
      </Link>
    </div>
  );
}
