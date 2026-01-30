import React, { useState, useEffect, useMemo } from 'react';
import { SONGS } from './data';
import { Category, Song } from './types';

// Icons using FontAwesome classes (assumed loaded via CDN in index.html)
const IconList = () => <i className="fas fa-list-ul" />;
const IconSearch = () => <i className="fas fa-search" />;
const IconPlay = () => <i className="fas fa-play-circle" />;
const IconDisc = () => <i className="fas fa-compact-disc" />;
const IconYoutube = () => <i className="fab fa-youtube" />;
const IconClose = () => <i className="fas fa-times" />;
const IconCalendar = () => <i className="far fa-calendar-alt" />;
const IconClear = () => <i className="fas fa-times-circle" />;

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger entrance animation on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Enhanced search logic: Token-based matching (AND operator) across all fields
  const filteredSongs = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // Optimization: If search is empty, just filter by category
    if (!normalizedSearch) {
       return activeCategory === 'all' 
         ? SONGS 
         : SONGS.filter(song => song.category === activeCategory);
    }

    const searchTokens = normalizedSearch.split(/\s+/);

    return SONGS.filter((song) => {
      const matchesCategory = activeCategory === 'all' || song.category === activeCategory;
      
      // Combine fields for searching. 
      const songData = `${song.title} ${song.artist} ${song.year} ${song.category}`.toLowerCase();
      
      // Check if EVERY token exists in the song data
      const matchesSearch = searchTokens.every(token => songData.includes(token));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handlePlay = (song: Song) => {
    setActiveSong(song);
  };

  const closeToast = () => {
    setActiveSong(null);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'ALL' },
    { id: 'legend', label: '3대장 (LEGEND)' },
    { id: 'sensual', label: '센슈얼 (SENSUAL)' },
    { id: 'remix', label: '리믹스 (REMIX)' },
    { id: 'others', label: '기타/전문가용 (OTHERS)' },
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-pink-500 selection:text-white pb-32 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[#0f172a]">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[128px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/10 backdrop-blur-xl bg-slate-900/60 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => { setActiveCategory('all'); setSearchTerm(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all duration-300">
             <IconList />
          </div>
          <h1 className="text-xl font-bold tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Bachata <span className="text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">Database</span>
          </h1>
        </div>
        
        {/* Desktop Search */}
        <div className="relative w-1/2 max-w-md hidden sm:block group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm group-focus-within:text-pink-400 transition-colors">
                <IconSearch />
             </span>
            <input 
              type="text" 
              placeholder="곡명, 아티스트 또는 연도 검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-full py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 text-slate-200 placeholder-slate-500 transition-all shadow-inner"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <IconClear />
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        
        {/* Header Section */}
        <div className={`mb-12 text-center sm:text-left transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
            통합 플레이리스트
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-lg sm:text-2xl ml-0 sm:ml-3 font-semibold uppercase tracking-widest">
              Full Collection
            </span>
          </h2>
          
          <div className="relative group inline-block">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
             <div className="relative p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto sm:mx-0 shadow-2xl">
                <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed">
                  <span className="text-pink-400 font-bold drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">Cristian, Gabriella, Marco, Sara, Daniel, Desiree, Gero, Miglė</span>
                  <span className="block sm:inline text-slate-400 text-sm sm:text-base mt-2 sm:mt-0 sm:ml-2">채널의 모든 곡이 포함되었습니다.</span>
                </p>
             </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap gap-3 mb-8 pb-6 border-b border-white/5 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95
                ${activeCategory === cat.id 
                  ? 'text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] ring-1 ring-pink-400/50' 
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-white/10'
                }`}
            >
              {activeCategory === cat.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 -z-10"></div>
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden mb-8 relative group">
           <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition-opacity"></div>
           <div className="relative">
             <input 
              type="text" 
              placeholder="검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full bg-slate-800/90 border border-slate-700/50 rounded-xl py-3.5 px-5 pr-12 text-sm focus:outline-none focus:border-pink-500/50 text-white placeholder-slate-500"
            />
             {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors z-10"
              >
                <IconClear />
              </button>
            )}
           </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 px-4 py-3 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 mb-2">
            <div className="col-span-1">#</div>
            <div className="col-span-6 sm:col-span-4">Title</div>
            <div className="hidden sm:block sm:col-span-1 text-center">Year</div>
            <div className="col-span-3 sm:col-span-4 text-center">Artist</div>
            <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Song List */}
        <div className="space-y-1">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div 
                key={`${song.title}-${index}`}
                onClick={() => handlePlay(song)}
                className={`group grid grid-cols-12 px-4 py-4 items-center rounded-xl cursor-pointer border border-transparent hover:border-pink-500/20 hover:bg-white/5 transition-all duration-300 animate-fadeIn`}
                style={{ animationDelay: `${Math.min(index * 30, 500)}ms` }}
              >
                <div className="col-span-1 text-xs text-slate-600 font-mono group-hover:text-pink-500 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Title Column */}
                <div className="col-span-6 sm:col-span-4 pr-2">
                    <p className="font-semibold text-sm sm:text-base text-slate-200 truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all">
                      {song.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="sm:hidden inline-flex items-center gap-1 text-[9px] text-slate-400 font-mono bg-slate-800/80 px-1.5 py-0.5 rounded border border-white/5">
                        <span className="opacity-60"><IconCalendar /></span> {song.year}
                      </span>
                      <span className="sm:hidden inline-block text-[9px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-500 font-bold uppercase border border-white/5">
                        {song.category}
                      </span>
                    </div>
                </div>

                {/* Year Column (Desktop Only) */}
                <div className="hidden sm:block sm:col-span-1 text-center">
                    <span className="text-xs font-mono text-slate-500 group-hover:text-pink-400 transition-colors bg-slate-800/30 px-2 py-1 rounded-md border border-white/5">
                      {song.year}
                    </span>
                </div>

                <div className="col-span-3 sm:col-span-4 text-xs sm:text-sm text-center text-slate-500 truncate group-hover:text-slate-300 transition-colors">
                  {song.artist}
                </div>
                <div className="col-span-2 text-right flex justify-end items-center gap-2">
                    <span className="hidden sm:inline-block text-[10px] px-2 py-1 rounded bg-slate-800/50 text-slate-500 uppercase font-bold border border-white/5 group-hover:border-pink-500/30 transition-colors">
                      {song.category}
                    </span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] group-hover:scale-110 transition-all duration-300">
                      <div className="text-xs transform translate-x-0.5">
                         <IconPlay />
                      </div>
                    </button>
                </div>
              </div>
            ))
          ) : (
             <div className="py-32 text-center text-slate-600 flex flex-col items-center animate-fadeIn">
                <div className="text-5xl mb-4 opacity-20">
                   <IconSearch />
                </div>
                <p className="text-lg">검색 결과가 없습니다.</p>
                <p className="text-sm opacity-50 mt-2">다른 검색어로 시도해보세요.</p>
                {searchTerm && (
                   <button 
                     onClick={clearSearch}
                     className="mt-4 px-4 py-2 rounded-lg bg-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-white transition-all text-sm font-bold"
                   >
                     검색어 초기화
                   </button>
                )}
             </div>
          )}
        </div>
      </main>

      {/* Footer / Credits */}
      <footer className="relative z-10 py-12 text-center">
        <div className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-xl">
           <span className="text-slate-400 text-xs sm:text-sm font-bold tracking-widest uppercase mr-3">Produced by</span>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 font-black text-sm sm:text-lg tracking-wider drop-shadow-sm">
             DJ Doberman
           </span>
        </div>
      </footer>

      {/* Floating Player Toast */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg p-[1px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 z-[100] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${activeSong ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[150%] opacity-0 scale-95'}`}
      >
        <div className="bg-[#0f172a]/95 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
           {/* Rotating Disc Art */}
           <div className={`w-12 h-12 relative flex items-center justify-center rounded-full overflow-hidden ring-2 ring-white/10 ${activeSong ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
              <div className="absolute inset-[35%] bg-[#0f172a] rounded-full border border-white/20 z-10"></div>
              <div className="relative z-20 text-pink-500 text-lg">
                 <IconDisc />
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
           </div>

           <div className="flex-1 min-w-0">
               <p className="font-bold text-sm text-white truncate pr-2">
                 {activeSong?.title}
               </p>
               <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="truncate max-w-[120px]">{activeSong?.artist}</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  <span className="text-pink-400 font-mono text-[10px]">{activeSong?.year}</span>
               </div>
           </div>

           <div className="flex items-center gap-3">
              <a 
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${activeSong?.artist} ${activeSong?.title} bachata`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                 <IconYoutube /> Play
              </a>
              <button 
                onClick={closeToast}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
              >
                 <IconClose />
              </button>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0; 
        }
      `}</style>
    </div>
  );
};

export default App;
