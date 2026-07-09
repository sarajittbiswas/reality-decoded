"use client";

import { useState, useEffect, useRef } from 'react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

type InteractionsProps = {
  id: string;
  title: string;
};

// Upgraded Options: Pill-shaped data with brand-specific hover states
const shareOptions = [
  {
    id: 'twitter',
    label: 'Post to X',
    hoverStyle: 'hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white/5',
    textHover: 'group-hover/btn:text-white',
    iconFill: 'fill-gray-400 group-hover/btn:fill-white',
    icon: <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    hoverStyle: 'hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:bg-[#25D366]/10',
    textHover: 'group-hover/btn:text-[#25D366]',
    iconFill: 'fill-gray-400 group-hover/btn:fill-[#25D366]',
    icon: <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  },
  {
    id: 'reddit',
    label: 'Reddit',
    hoverStyle: 'hover:border-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:bg-[#FF4500]/10',
    textHover: 'group-hover/btn:text-[#FF4500]',
    iconFill: 'fill-gray-400 group-hover/btn:fill-[#FF4500]',
    icon: <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.249 0 .688.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-2.752 4.122c-1.631 0-2.316.892-2.336.923a.346.346 0 0 0 .193.535.343.343 0 0 0 .524-.193c.01-.01.523-.559 1.619-.559 1.096 0 1.609.549 1.619.559a.344.344 0 0 0 .524.193.346.346 0 0 0 .193-.535c-.02-.031-.705-.923-2.336-.923z"/></svg>
  },
  {
    id: 'facebook',
    label: 'Facebook',
    hoverStyle: 'hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.3)] hover:bg-[#1877F2]/10',
    textHover: 'group-hover/btn:text-[#1877F2]',
    iconFill: 'fill-gray-400 group-hover/btn:fill-[#1877F2]',
    icon: <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  },
  {
    id: 'instagram',
    label: 'Instagram',
    hoverStyle: 'hover:border-[#E1306C] hover:shadow-[0_0_15px_rgba(225,48,108,0.3)] hover:bg-[#E1306C]/10',
    textHover: 'group-hover/btn:text-[#E1306C]',
    iconFill: 'stroke-gray-400 group-hover/btn:stroke-[#E1306C] fill-none',
    icon: <svg className="w-5 h-5 transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  },
  {
    id: 'copy',
    label: 'Copy Link',
    hoverStyle: 'hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-purple-400/10',
    textHover: 'group-hover/btn:text-purple-400',
    iconFill: 'text-gray-400 group-hover/btn:text-purple-400',
    icon: <svg className="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
  }
];

export default function Interactions({ id, title }: InteractionsProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [shares, setShares] = useState(0);
  
  const [showShareMenu, setShowShareMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); 
  
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSyncing, setIsSyncing] = useState(true);

  // 1. Fetch Global Data on Load
  useEffect(() => {
    const localHasLiked = localStorage.getItem(`hasLiked_${id}`);
    if (localHasLiked === 'true') setHasLiked(true);

    fetch(`/api/interactions?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes);
        setShares(data.shares);
        const formattedComments = data.comments.map((c: any) => ({
          ...c,
          date: new Date(c.date).toLocaleDateString()
        }));
        setComments(formattedComments);
        setIsSyncing(false);
      })
      .catch(() => setIsSyncing(false));
  }, [id]);

  // 2. Click Outside Logic (Closes menu if you tap anywhere else on mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Handle Like
  const handleLike = () => {
    const action = hasLiked ? 'UNLIKE' : 'LIKE';
    const newLikes = hasLiked ? likes - 1 : likes + 1;
    
    setHasLiked(!hasLiked);
    setLikes(newLikes);
    localStorage.setItem(`hasLiked_${id}`, (!hasLiked).toString());

    fetch('/api/interactions', {
      method: 'POST',
      body: JSON.stringify({ action, id })
    });
  };

  // 4. Handle Share
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Classified Intelligence: ${title}`;
    
    setShares(shares + 1);
    setShowShareMenu(false); 

    fetch('/api/interactions', {
      method: 'POST',
      body: JSON.stringify({ action: 'SHARE', id })
    });

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'reddit') {
      window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'instagram') {
      navigator.clipboard.writeText(url);
      alert("Intelligence link copied! Paste it into your Instagram Story or Bio.");
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert("Secure link copied to clipboard.");
    }
  };

  // 5. Handle Comments
  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const alias = "Anonymous"; 
    const freshComment = { name: alias, text: newComment, date: 'Just now' };
    setComments([freshComment, ...comments]);
    setNewComment('');

    fetch('/api/interactions', {
      method: 'POST',
      body: JSON.stringify({ action: 'COMMENT', id, payload: { name: alias, text: newComment } })
    });
  };

  if (isSyncing) {
    return <div className="mt-12 pt-8 border-t border-white/10 text-center text-purple-500 font-mono text-sm animate-pulse">Syncing with global network...</div>;
  }

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      
      {/* ACTION BAR (Like & Share) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 relative">
        
        {/* LOVE BUTTON */}
        <button 
          onClick={handleLike}
          className={`flex items-center justify-center sm:justify-start gap-3 px-5 py-3 rounded-full border transition-all duration-300 w-full sm:w-auto ${
            hasLiked 
              ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
              : 'bg-[#111] border-white/10 text-gray-400 hover:border-red-500/50 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]'
          }`}
        >
          <svg className={`w-5 h-5 transition-transform ${hasLiked ? 'scale-110 fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <span className={`${spaceGrotesk.className} font-bold tracking-wide`}>{likes} Intelligence {likes === 1 ? 'Point' : 'Points'}</span>
        </button>

        {/* SHARE MENU WRAPPER: Handles the continuous hover state */}
        <div 
          ref={menuRef}
          className="relative w-full sm:w-auto z-50 group"
          onMouseEnter={() => setShowShareMenu(true)}
          onMouseLeave={() => setShowShareMenu(false)}
        >
          {/* Main Share Button */}
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center justify-center sm:justify-start gap-3 px-5 py-3 rounded-full bg-[#111] border border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 w-full sm:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l5.628 3.376c.19.114.417.172.656.172a3 3 0 100-5.368c-.239 0-.466.058-.656.172l-5.628 3.376a3 3 0 110-5.368l5.628-3.376c.19-.114.417-.172.656-.172a3 3 0 100 5.368c-.239 0-.466-.058-.656-.172m-5.628 3.376a3 3 0 110-5.368m0 5.368a3 3 0 110 5.368"></path></svg>
            <span className={`${spaceGrotesk.className} font-bold tracking-wide`}>{shares} Transmissions</span>
          </button>

          {/* THE HOVERABLE POPUP MENU */}
          <div className={`
            absolute bottom-full right-0 pb-4 w-full sm:w-56 flex flex-col gap-2 
            transition-all duration-300 ease-out origin-bottom
            ${showShareMenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}
          `}>
            {/* The transparent pb-4 above creates a "hover bridge" so your mouse doesn't fall off! */}
            
            <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col gap-1">
              {shareOptions.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleShare(item.id)} 
                  className={`group/btn flex items-center gap-3 px-4 py-2.5 rounded-xl bg-transparent border border-transparent text-gray-400 transition-all duration-300 w-full ${item.hoverStyle}`}
                >
                  {/* Icon */}
                  <div className={`w-5 h-5 flex items-center justify-center transition-colors ${item.iconFill}`}>
                    {item.icon}
                  </div>
                  
                  {/* Label */}
                  <span className={`${spaceGrotesk.className} font-bold text-sm tracking-wide transition-colors ${item.textHover}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <div className="bg-[#111111]/80 backdrop-blur-md rounded-2xl border border-white/5 p-6 md:p-8">
        <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3`}>
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
          Field Notes ({comments.length})
        </h3>

        <form onSubmit={submitComment} className="mb-8 relative">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your analysis... (No login required)"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"
            rows={3}
            required
          ></textarea>
          <button type="submit" className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest transition-colors shadow-lg">
            Post Node
          </button>
        </form>

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="p-4 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <span className="text-sm font-bold text-gray-300">{comment.name}</span>
                <span className="text-xs text-gray-600 font-mono ml-auto">{comment.date}</span>
              </div>
              <p className="text-gray-400 text-sm">{comment.text}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-600 text-sm italic text-center py-4">No field notes recorded yet. Be the first to analyze this drop.</p>
          )}
        </div>
      </div>
    </div>
  );
}