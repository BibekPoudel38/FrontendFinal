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


const ThreadPreviewer = ({ content }) => {
    const editor = useEditor({
        extensions: [StarterKit,
            Underline,
            Strike,
            Heading,
            BulletList,
            OrderedList,
            ListItem,
            CodeBlock,
            Blockquote,
            HorizontalRule,],
        content: content, // this should be the JSON object from backend
        editable: false, // make it read-only
    });

    if (!editor) return <div>Loading...</div>;

    return (
        <div className="prose dark:prose-invert max-w-none">
            <EditorContent editor={editor} />
        </div>
    );
};

export default ThreadPreviewer;
