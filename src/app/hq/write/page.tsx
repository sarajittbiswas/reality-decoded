"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Space_Grotesk } from "next/font/google";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading1, Heading2, Heading3, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, 
  Link as LinkIcon, Image as ImageIcon, Video as YoutubeIcon,
  Undo, Redo, Palette, Save, ArrowLeft, X
} from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const sanitizeTags = (raw: string) => {
  return raw.split(',').map(t => t.trim()).filter(Boolean).join(',');
};

const MenuBar = ({ editor, openModal }: { editor: any, openModal: (type: 'link' | 'image' | 'youtube') => void }) => {
  if (!editor) return null;

  const btn = "p-2 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white";
  const activeBtn = "p-2 rounded bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.8)] border border-purple-400 transition-all";
  const divider = "w-px h-6 bg-white/10 mx-2 self-center";

  return (
    <div className="flex flex-wrap gap-1 mb-4 p-2 bg-[#0a0a0a] border border-white/10 rounded-xl sticky top-4 z-50 shadow-2xl">
      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btn}><Undo size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btn}><Redo size={18} /></button>
      <div className={divider}></div>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? activeBtn : btn}><Heading1 size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? activeBtn : btn}><Heading2 size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? activeBtn : btn}><Heading3 size={18} /></button>
      <div className={divider}></div>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? activeBtn : btn}><Bold size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? activeBtn : btn}><Italic size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? activeBtn : btn}><UnderlineIcon size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? activeBtn : btn}><Strikethrough size={18} /></button>
      
      <div className="relative flex items-center ml-1">
        <Palette size={18} className="text-gray-400 absolute pointer-events-none left-2" />
        <input 
          type="color" 
          onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
          value={editor.getAttributes('textStyle').color || '#ffffff'}
          className="w-8 h-8 opacity-0 cursor-pointer"
          title="Text Color"
        />
      </div>
      <div className={divider}></div>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? activeBtn : btn}><AlignLeft size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? activeBtn : btn}><AlignCenter size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? activeBtn : btn}><AlignRight size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? activeBtn : btn}><AlignJustify size={18} /></button>
      <div className={divider}></div>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? activeBtn : btn}><List size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? activeBtn : btn}><ListOrdered size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? activeBtn : btn}><Quote size={18} /></button>
      <div className={divider}></div>
      
      <button type="button" onClick={() => openModal('link')} className={editor.isActive('link') ? activeBtn : btn}><LinkIcon size={18} /></button>
      <button type="button" onClick={() => openModal('image')} className={btn}><ImageIcon size={18} /></button>
      <button type="button" onClick={() => openModal('youtube')} className={btn}><YoutubeIcon size={18} /></button>
    </div>
  );
};

function WriterWorkbench() {
  const searchParams = useSearchParams();
  const urlDraftId = searchParams.get('id');

  const [tags, setTags] = useState('');
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState("");
  const [saveStatus, setSaveStatus] = useState("Standing by...");
  const [articleId, setArticleId] = useState<string | null>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  
  const [agentId, setAgentId] = useState("");
  const [agents, setAgents] = useState<{id: string, name: string}[]>([]);
  
  // 🚨 UPGRADE: Advanced State Tracking (Draft vs Published vs Scheduled)
  const [articleStatus, setArticleStatus] = useState<string>("draft");

  const [, setForceUpdate] = useState(0);
  const [modal, setModal] = useState<{isOpen: boolean, type: 'link' | 'image' | 'youtube', url: string}>({ isOpen: false, type: 'link', url: '' });

  const storageKey = urlDraftId ? `syndicate_draft_${urlDraftId}` : "syndicate_draft";

  const saveDraftLocally = (t: string, c: string, tags: string, content: string) => {
    localStorage.setItem(storageKey, JSON.stringify({ title: t, category: c, tags, content }));
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      LinkExtension.configure({ openOnClick: false }),
      Image,
      Youtube
    ],
    content: "", 
    onUpdate: ({ editor }) => saveDraftLocally(title, category, tags, editor.getHTML()),
    onTransaction: () => setForceUpdate(prev => prev + 1)
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/agents').then(res => res.json()),
      fetch('/api/auth/me').then(res => res.json()).catch(() => ({ id: '' }))
    ]).then(([agentsData, meData]) => {
      setAgents(agentsData);

      if (urlDraftId) {
        setSaveStatus("Fetching from Mainframe...");
        fetch(`/api/editor?id=${urlDraftId}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setTitle(data.article.title);
              setCategory(data.article.category || "");
              setTags(data.article.tags || "");
              setArticleId(data.article.id);
              setExcerpt(data.article.excerpt || '');
              setAgentId(data.article.agent_id || "");
              
              // 🚨 FIX: Sets the exact status so the buttons render correctly
              setArticleStatus(data.article.status);

              const saved = localStorage.getItem(storageKey);
              if (saved && editor && editor.isEmpty) {
                const { content: savedContent } = JSON.parse(saved);
                editor.commands.setContent(savedContent || data.article.content);
              } else if (editor && editor.isEmpty) {
                editor.commands.setContent(data.article.content);
              }
              setSaveStatus("Secure link established");
            } else {
              setSaveStatus("Error loading draft");
            }
          });
      } else {
        if (meData && meData.id) {
          setAgentId(meData.id);
        }

        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const { title: savedTitle, category: savedCategory, tags: savedTags, content: savedContent } = JSON.parse(saved);
          if (savedTitle) setTitle(savedTitle);
          if (savedCategory) setCategory(savedCategory);
          if (savedTags) setTags(savedTags);
          if (savedContent && editor && editor.isEmpty) {
            editor.commands.setContent(savedContent);
          }
          setSaveStatus("Draft restored from memory");
        }
      }
    });

    fetch('/api/tags')
      .then(res => res.json())
      .then(data => setSuggestedTags(data));
  }, [editor, urlDraftId, storageKey]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (editor) saveDraftLocally(e.target.value, category, tags, editor.getHTML());
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    if (editor) saveDraftLocally(title, e.target.value, tags, editor.getHTML());
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
    if (editor) saveDraftLocally(title, category, e.target.value, editor.getHTML());
  };

  const openModal = (type: 'link' | 'image' | 'youtube') => {
    let currentUrl = '';
    if (type === 'link') currentUrl = editor?.getAttributes('link').href || '';
    setModal({ isOpen: true, type, url: currentUrl });
  };

  const handleModalSubmit = () => {
    if (!editor) return;
    if (modal.type === 'link') {
      if (modal.url === '') editor.chain().focus().extendMarkRange('link').unsetLink().run();
      else editor.chain().focus().extendMarkRange('link').setLink({ href: modal.url }).run();
    } else if (modal.type === 'image') {
      if (modal.url) editor.chain().focus().setImage({ src: modal.url }).run();
    } else if (modal.type === 'youtube') {
      if (modal.url) editor.chain().focus().setYoutubeVideo({ src: modal.url }).run();
    }
    setModal({ ...modal, isOpen: false, url: '' });
  };

  const handleServerAction = async (targetStatus: 'draft' | 'pending' | 'published' | 'scheduled') => {
    if (!editor || !title) {
      alert("A title is required to save to the mainframe.");
      return;
    }

    const cleanedTags = sanitizeTags(tags);
    setSaveStatus(targetStatus === 'draft' ? "Encrypting to Server..." : "Transmitting to HQ...");
    
    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: articleId || undefined,
          title,
          category,
          tags: cleanedTags,
          content: editor.getHTML(),
          status: targetStatus,
          agent_id: agentId || null, 
          excerpt,
        })
      });

      const result = await response.json();

      if (result.success && result.id) {
        setArticleId(result.id); 
        
        if (targetStatus === 'published' || targetStatus === 'scheduled') {
           setSaveStatus("Live File Updated Successfully");
        } else {
           setSaveStatus(targetStatus === 'draft' ? "Draft secured in Mainframe" : "Transmitted to HQ Queue");
        }
        
        if (targetStatus !== 'draft') {
          localStorage.removeItem(storageKey);
          setTimeout(() => window.location.href = '/hq', 1500); 
        }
      } else {
        setSaveStatus("Transmission Failed");
        alert("Mainframe error: " + (result.error || "Unknown database error."));
      }
    } catch (error) {
      console.error(error);
      setSaveStatus("Critical System Failure");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-10 pb-20 px-6 font-mono relative">
      
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-purple-500/50 p-8 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] w-full max-w-lg relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setModal({ ...modal, isOpen: false })} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-2 uppercase tracking-widest flex items-center gap-3`}>
              <span className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_purple]"></span>
              {modal.type === 'link' ? 'Insert Hyperlink' : modal.type === 'image' ? 'Attach Image File' : 'Embed Video Stream'}
            </h3>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">
              {modal.type === 'link' ? 'Enter the target destination URL below.' : modal.type === 'image' ? 'Enter the direct URL to the hosted image file.' : 'Enter the YouTube URL to embed the player.'}
            </p>
            <input
              type="text"
              placeholder={modal.type === 'link' ? "https://..." : "Paste secure URL here..."}
              value={modal.url}
              onChange={(e) => setModal({ ...modal, url: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleModalSubmit()}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all mb-8 font-mono text-sm"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setModal({ ...modal, isOpen: false })} className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                Cancel
              </button>
              <button onClick={handleModalSubmit} className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                Confirm Injection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <Link href="/hq" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest font-bold mb-10">
          <ArrowLeft size={16} /> Return to HQ
        </Link>
        <div className="flex justify-between items-end mb-10">
          <h1 className={`${spaceGrotesk.className} text-3xl font-bold text-gray-100 flex items-center gap-3`}>
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_purple]"></span>
            Syndicate Writer
          </h1>
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
            <Save size={14} className={saveStatus === "Saving..." ? "text-purple-400 animate-spin" : ""} />
            {saveStatus}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <input type="text" placeholder="ENTER TRANSMISSION TITLE..." value={title} onChange={handleTitleChange} className={`${spaceGrotesk.className} text-4xl bg-transparent border-b border-white/10 pb-4 outline-none focus:border-purple-500 transition-colors placeholder:text-gray-700 w-full uppercase`} />
          <input type="text" placeholder="CATEGORY" value={category} onChange={handleCategoryChange} className="bg-transparent border-b border-white/10 pb-4 outline-none focus:border-purple-500 transition-colors placeholder:text-gray-700 text-sm text-purple-400 uppercase tracking-widest w-full" />
<div className="mb-6">
  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Transmission Excerpt</label>
  <textarea
    value={excerpt}
    onChange={(e) => setExcerpt(e.target.value)}
    className="w-full bg-[#111] border border-white/10 p-3 text-white text-sm rounded-lg focus:border-purple-500 outline-none"
    placeholder="Short summary for the archive cards..."
    rows={2}
  />
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-400">Tags (comma separated)</label>
              <input type="text" name="tags" value={tags} onChange={handleTagsChange} placeholder="e.g. ufo,conspiracy" className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50" />
              
              {suggestedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest mr-2 self-center">Suggested:</span>
                  {suggestedTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const current = tags.split(',').map(t => t.trim()).filter(Boolean);
                        if (!current.includes(tag)) {
                          const newTags = [...current, tag].join(',');
                          setTags(newTags);
                          saveDraftLocally(title, category, newTags, editor?.getHTML() || "");
                        }
                      }}
                      className="text-[10px] bg-white/5 border border-white/10 hover:border-purple-500/50 text-gray-400 hover:text-purple-400 px-3 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-400">Assigned Agent</label>
              <select
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                disabled={articleStatus === 'published' || articleStatus === 'scheduled'}
                className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed appearance-none tracking-widest uppercase text-sm"
              >
                <option value="">-- UNASSIGNED --</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
              {(articleStatus === 'published' || articleStatus === 'scheduled') && <span className="text-[10px] text-purple-400 tracking-widest uppercase">File Live/Scheduled: Agent assignment locked.</span>}
            </div>
          </div>

          <div className="mt-4 relative">
            <MenuBar editor={editor} openModal={openModal} />
            <div className="bg-[#111] border border-white/5 p-4 rounded-xl shadow-2xl focus-within:border-purple-500/30 transition-all">
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Link href="/hq" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest font-bold"><ArrowLeft size={14} /> Return to HQ</Link>
            
            {/* 🚨 FIX: Context Aware Buttons that break the downgrade loop! */}
            {articleStatus === 'published' ? (
              <button 
                onClick={() => handleServerAction('published')} 
                className="px-8 py-3 rounded-lg text-xs tracking-widest uppercase bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                Update Live File
              </button>
            ) : articleStatus === 'scheduled' ? (
              <button 
                onClick={() => handleServerAction('scheduled')} 
                className="px-8 py-3 rounded-lg text-xs tracking-widest uppercase bg-yellow-600 hover:bg-yellow-500 text-white font-bold transition-colors shadow-[0_0_15px_rgba(202,138,4,0.4)]"
              >
                Update Scheduled File
              </button>
            ) : (
              <>
                <button onClick={() => { localStorage.removeItem(storageKey); window.location.href = '/hq/write'; }} className="px-6 py-3 rounded-lg text-xs tracking-widest uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-bold">Scrap Draft</button>
                <button onClick={() => handleServerAction('draft')} className="px-6 py-3 rounded-lg text-xs tracking-widest uppercase border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-colors font-bold">Save Server Draft</button>
                <button onClick={() => handleServerAction('pending')} className="px-8 py-3 rounded-lg text-xs tracking-widest uppercase bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">Submit to HQ Queue</button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .ProseMirror { min-height: 500px !important; outline: none !important; color: #e5e7eb !important; font-size: 1.125rem !important; line-height: 1.75 !important;}
        .ProseMirror p.is-editor-empty:first-child::before { color: #4b5563 !important; content: attr(data-placeholder) !important; float: left !important; height: 0 !important; pointer-events: none !important; }
        .ProseMirror h1, .ProseMirror h2, .ProseMirror h3 { color: #ffffff !important; font-weight: 700 !important; margin-top: 1.5em !important; margin-bottom: 0.5em !important; line-height: 1.3 !important; }
        .ProseMirror h1 { font-size: 2.25rem !important; }
        .ProseMirror h2 { font-size: 1.875rem !important; }
        .ProseMirror h3 { font-size: 1.5rem !important; }
        .ProseMirror p { margin-bottom: 1.5em !important; }
        .ProseMirror strong, .ProseMirror b { font-weight: bold !important; color: #ffffff !important; }
        .ProseMirror em, .ProseMirror i { font-style: italic !important; }
        .ProseMirror ul { list-style-type: disc !important; padding-left: 1.5rem !important; margin-bottom: 1.5em !important; }
        .ProseMirror ol { list-style-type: decimal !important; padding-left: 1.5rem !important; margin-bottom: 1.5em !important; }
        .ProseMirror blockquote { border-left: 4px solid #a855f7 !important; padding: 0.5rem 0 0.5rem 1.25rem !important; margin: 1.5em 0 !important; font-style: italic !important; background: rgba(168,85,247,0.05) !important; border-radius: 0 0.5rem 0.5rem 0 !important; }
        .ProseMirror a { color: #c084fc !important; text-decoration: underline !important; text-underline-offset: 4px !important;}
        .ProseMirror img { display: block !important; max-width: 100% !important; margin: 1.5rem auto !important; border-radius: 0.75rem !important; border: 1px solid rgba(255,255,255,0.1) !important; }
        .ProseMirror iframe { width: 100% !important; aspect-ratio: 16 / 9 !important; border-radius: 0.75rem !important; margin: 1.5rem 0 !important; border: 1px solid rgba(255,255,255,0.1) !important; }
      `}} />
    </main>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] text-purple-400 flex items-center justify-center font-mono text-sm tracking-widest uppercase">Initializing...</div>}>
      <WriterWorkbench />
    </Suspense>
  );
}