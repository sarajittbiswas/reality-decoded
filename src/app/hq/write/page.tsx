"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Space_Grotesk } from "next/font/google";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading1, Heading2, Heading3, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, 
  Link as LinkIcon, Image as ImageIcon, Video as YoutubeIcon,
  Undo, Redo, Palette, Save, ArrowLeft
} from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// --- THE TOOLBAR ---
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const btn = "p-2 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white";
  const activeBtn = "p-2 rounded bg-purple-500/20 text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)] border border-purple-500/50";
  const divider = "w-px h-6 bg-white/10 mx-2 self-center";

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href || '';
    const url = window.prompt('Enter link URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Enter Image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt('Enter YouTube URL:');
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

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
      <button type="button" onClick={addLink} className={editor.isActive('link') ? activeBtn : btn}><LinkIcon size={18} /></button>
      <button type="button" onClick={addImage} className={btn}><ImageIcon size={18} /></button>
      <button type="button" onClick={addYoutube} className={btn}><YoutubeIcon size={18} /></button>
    </div>
  );
};

// --- THE WORKBENCH MAIN COMPONENT ---
function WriterWorkbench() {
  const searchParams = useSearchParams();
  const urlDraftId = searchParams.get('id');

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [saveStatus, setSaveStatus] = useState("Standing by...");
  const [articleId, setArticleId] = useState<string | null>(null);

  const saveDraftLocally = (t: string, c: string, content: string) => {
    setSaveStatus("Saving...");
    localStorage.setItem("syndicate_draft", JSON.stringify({ title: t, category: c, content }));
    setTimeout(() => setSaveStatus("Draft saved locally"), 1000);
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
    onUpdate: ({ editor }) => saveDraftLocally(title, category, editor.getHTML())
  });

  // THE MAGIC AUTO-LOADER
  useEffect(() => {
    if (urlDraftId) {
      // 1. If we clicked a draft from HQ, fetch it from the database
      setSaveStatus("Fetching from Mainframe...");
      fetch(`/api/editor?id=${urlDraftId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTitle(data.article.title);
            setCategory(data.article.category || "");
            setArticleId(data.article.id);
            if (editor && editor.isEmpty) {
              editor.commands.setContent(data.article.content);
            }
            setSaveStatus("Secure link established");
          } else {
            setSaveStatus("Error loading draft");
          }
        });
    } else {
      // 2. If it's a blank page, check local storage for crash-recovery
      const saved = localStorage.getItem("syndicate_draft");
      if (saved) {
        const { title: savedTitle, category: savedCategory, content: savedContent } = JSON.parse(saved);
        if (savedTitle) setTitle(savedTitle);
        if (savedCategory) setCategory(savedCategory);
        if (savedContent && editor && editor.isEmpty) {
          editor.commands.setContent(savedContent);
        }
        setSaveStatus("Draft restored from memory");
      }
    }
  }, [editor, urlDraftId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (editor) saveDraftLocally(e.target.value, category, editor.getHTML());
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    if (editor) saveDraftLocally(title, e.target.value, editor.getHTML());
  };

  const handleServerAction = async (status: 'draft' | 'pending') => {
    if (!editor || !title) {
      alert("A title is required to save to the mainframe.");
      return;
    }

    setSaveStatus(status === 'draft' ? "Encrypting to Server..." : "Transmitting to HQ...");
    
    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: articleId || undefined,
          title,
          category,
          content: editor.getHTML(),
          status
        })
      });

      const result = await response.json();

      if (result.success && result.id) {
        setArticleId(result.id); 
        setSaveStatus(status === 'draft' ? "Draft secured in Mainframe" : "Transmitted to HQ Queue");
        
        if (status === 'pending') {
          localStorage.removeItem("syndicate_draft");
          setTimeout(() => window.location.href = '/hq', 1500); 
        }
      } else {
        setSaveStatus("Transmission Failed");
        alert("Mainframe error: " + (result.error || "Unknown database error. Check terminal."));
      }
    } catch (error) {
      console.error(error);
      setSaveStatus("Critical System Failure");
      alert("Critical failure. The connection to the database was severed.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-10 pb-20 px-6 font-mono">
      <div className="max-w-5xl mx-auto">
        
        {/* BACK TO HQ NAVIGATION */}
        <Link 
          href="/hq" 
          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest font-bold mb-10"
        >
          <ArrowLeft size={16} />
          Return to HQ
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
          <input
            type="text"
            placeholder="ENTER TRANSMISSION TITLE..."
            value={title}
            onChange={handleTitleChange}
            className={`${spaceGrotesk.className} text-4xl bg-transparent border-b border-white/10 pb-4 outline-none focus:border-purple-500 transition-colors placeholder:text-gray-700 w-full uppercase`}
          />

          <input
            type="text"
            placeholder="CATEGORY (e.g. CYBER, FIELD OP, THEORY)"
            value={category}
            onChange={handleCategoryChange}
            className="bg-transparent border-b border-white/10 pb-4 outline-none focus:border-purple-500 transition-colors placeholder:text-gray-700 text-sm text-purple-400 uppercase tracking-widest w-full"
          />

          <div className="mt-4 relative">
            <MenuBar editor={editor} />
            <div className="bg-[#111] border border-white/5 p-4 rounded-xl shadow-2xl focus-within:border-purple-500/30 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all">
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            
            {/* LEFT SIDE: Back Button */}
            <Link 
              href="/hq" 
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest font-bold"
            >
              <ArrowLeft size={14} />
              Return to HQ
            </Link>

            <button 
              onClick={() => { localStorage.removeItem("syndicate_draft"); window.location.href = '/hq/write'; }}
              className="px-6 py-3 rounded-lg text-xs tracking-widest uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-bold"
            >
              Scrap Draft
            </button>
            <button 
              onClick={() => handleServerAction('draft')}
              className="px-6 py-3 rounded-lg text-xs tracking-widest uppercase border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-colors font-bold shadow-[0_0_10px_rgba(168,85,247,0.1)]"
            >
              Save Server Draft
            </button>
            <button 
              onClick={() => handleServerAction('pending')}
              className="px-8 py-3 rounded-lg text-xs tracking-widest uppercase bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              Submit to HQ Queue
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror { min-height: 500px !important; outline: none !important; color: #e5e7eb !important; font-size: 1.125rem !important; line-height: 1.75 !important; }
        .ProseMirror h1 { font-size: 2.5em !important; font-weight: bold !important; margin-bottom: 0.5em !important; line-height: 1.2 !important; color: white !important; }
        .ProseMirror h2 { font-size: 2em !important; font-weight: bold !important; margin-bottom: 0.5em !important; margin-top: 1em !important; color: white !important; }
        .ProseMirror h3 { font-size: 1.5em !important; font-weight: bold !important; margin-bottom: 0.5em !important; margin-top: 1em !important; color: white !important; }
        .ProseMirror p { margin-bottom: 1em !important; }
        .ProseMirror ul { list-style-type: disc !important; padding-left: 2em !important; margin-bottom: 1em !important; }
        .ProseMirror ol { list-style-type: decimal !important; padding-left: 2em !important; margin-bottom: 1em !important; }
        .ProseMirror blockquote { border-left: 4px solid #a855f7 !important; padding-left: 1rem !important; margin-bottom: 1em !important; font-style: italic !important; background: rgba(168,85,247,0.05) !important; border-radius: 0 0.5rem 0.5rem 0 !important; }
        .ProseMirror a { color: #c084fc !important; text-decoration: underline !important; cursor: pointer !important; }
        .ProseMirror img { display: block !important; max-width: 100% !important; margin: 1.5rem auto !important; border-radius: 0.75rem !important; border: 1px solid rgba(255,255,255,0.1) !important; }
        .ProseMirror iframe { width: 100% !important; aspect-ratio: 16 / 9 !important; border-radius: 0.75rem !important; margin: 1.5rem 0 !important; border: 1px solid rgba(255,255,255,0.1) !important; }
        .ProseMirror p.is-editor-empty:first-child::before { color: #4b5563 !important; content: attr(data-placeholder) !important; float: left !important; height: 0 !important; pointer-events: none !important; }
      `}</style>
    </main>
  );
}

// Next.js 14 requires useSearchParams to be wrapped in a Suspense boundary
export default function WritePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] text-purple-400 flex items-center justify-center font-mono text-sm tracking-widest uppercase">
        Initializing Mainframe Uplink...
      </div>
    }>
      <WriterWorkbench />
    </Suspense>
  );
}