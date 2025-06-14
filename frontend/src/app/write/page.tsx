'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import 'highlight.js/styles/atom-one-dark.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// SVG icons for toolbar
const icons = {
  bold: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17H7a4 4 0 010-8h6a4 4 0 010 8zm0 0V7" /></svg>
  ),
  italic: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 4h-6m6 16h-6m2-16l-4 16" /></svg>
  ),
  underline: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4v6a6 6 0 0012 0V4m-9 16h6" /></svg>
  ),
  h1: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6v12m8-12v12m8-6h-8" /></svg>
  ),
  h2: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6v12m8-12v12m8 0h-8m8-6h-8" /></svg>
  ),
  list: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
  ),
  code: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
  ),
  quote: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4zm10 0a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4z" /></svg>
  ),
  image: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm16 10l-4-4-4 4-4-4" /></svg>
  ),
};

export default function WritePage() {
  const [title, setTitle] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        editor?.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);
    const json = editor?.getJSON();
    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content: json,
          author: 'Guest',
          isAakash: false,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit post');
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1800);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center py-12 px-2">
      <div className="relative bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-lg p-0 w-full max-w-3xl mx-auto font-serif">
        {/* Toolbar */}
        <div className="sticky top-0 z-10 flex flex-wrap gap-2 items-center bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-2 rounded-t-lg">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            aria-label="Bold"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.bold}
            <span className="sr-only">Bold</span>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            aria-label="Italic"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.italic}
            <span className="sr-only">Italic</span>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            aria-label="Underline"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.underline}
            <span className="sr-only">Underline</span>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            aria-label="Heading 1"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.h1}
            <span className="sr-only">Heading 1</span>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            aria-label="Heading 2"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.h2}
            <span className="sr-only">Heading 2</span>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            aria-label="Bullet List"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.list}
            <span className="sr-only">Bullet List</span>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            aria-label="Code Block"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.code}
            <span className="sr-only">Code Block</span>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            aria-label="Blockquote"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.quote}
            <span className="sr-only">Blockquote</span>
          </button>
          <button
            type="button"
            onClick={addImage}
            aria-label="Add Image"
            className="group p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-blue-900 border border-transparent focus:border-blue-500 transition flex items-center justify-center"
            tabIndex={0}
          >
            {icons.image}
            <span className="sr-only">Add Image</span>
          </button>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold w-full bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 focus:border-blue-500 focus:outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 py-6 px-8 transition-all duration-200 mb-2"
        />

        {/* Editor Area */}
        <div className="prose max-w-none px-8 pb-10 pt-2">
          <div
            className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md min-h-[320px] focus-within:ring-2 focus-within:ring-blue-500 transition-colors shadow-sm px-0 md:px-6 py-6"
          >
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="px-8 pb-8">
          {success ? (
            <div className="mt-4 w-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-semibold py-3 rounded-md text-center transition-all duration-200 text-lg">
              Post submitted! Redirecting to homepage...
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-lg"
              disabled={success}
            >
              Submit Post
            </button>
          )}
          {error && (
            <div className="mt-3 w-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-semibold py-2 rounded-md text-center transition-all duration-200 text-base">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
