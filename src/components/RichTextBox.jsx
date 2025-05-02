import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const buttonClasses = "px-2 py-1 text-xs bg-zinc-700 hover:bg-purple-600 rounded text-white transition";

    return (
        <div className="flex flex-wrap gap-2 mb-3">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClasses}>Bold</button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClasses}>Italic</button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonClasses}>Underline</button>
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClasses}>Strike</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonClasses}>H1</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClasses}>H2</button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClasses}>Bullet List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClasses}>Numbered List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonClasses}>Code</button>
            <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClasses}>Quote</button>
            <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={buttonClasses}>HR</button>
            <button type="button" onClick={() => editor.chain().focus().undo().run()} className={buttonClasses}>Undo</button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} className={buttonClasses}>Redo</button>
        </div>
    );
};

const TiptapEditor = ({ onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Strike,
            Heading,
            BulletList,
            OrderedList,
            ListItem,
            CodeBlock,
            Blockquote,
            HorizontalRule,
        ],
        content: '',
        onUpdate({ editor }) {
            const html = editor.getJSON();
            onChange && onChange(html);
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm lg:prose-base dark:prose-invert focus:outline-none min-h-[200px]',
            },
        },
    });

    return (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800 text-white p-4 shadow-md">
            <MenuBar editor={editor} />
            <div className="bg-zinc-900 rounded-lg p-4 min-h-[200px] max-h-[500px] overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TiptapEditor;
