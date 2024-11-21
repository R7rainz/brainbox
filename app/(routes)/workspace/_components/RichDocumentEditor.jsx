"use client"

import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import GenerateAITemplate from './GenerateAITemplate';
import debounce from 'lodash.debounce';

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const { user } = useUser();
  const [isFetched, setIsFetched] = useState(false);

  const InitEditor = () => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        onChange: debounce(() => {
          SaveDocument();
        }, 1000),
        onReady: () => {
          GetDocumentOutput();
        },
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3],
              defaultLevel: 2
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          code: CodeTool,
        },
        placeholder: 'Start writing your document...',
        data: {},
        minHeight: 0,
      });
    }
  };

  useEffect(() => {
    if (user && !editorRef.current) {
      InitEditor();
    }
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [user]);

  const SaveDocument = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        const docRef = doc(db, 'documentOutput', params?.documentid);
        await updateDoc(docRef, {
          output: JSON.stringify(outputData),
          editedBy: user?.primaryEmailAddress?.emailAddress,
        });
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }
  };

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid), (doc) => {
      const docData = doc.data();
      if (docData?.editedBy !== user?.primaryEmailAddress?.emailAddress || !isFetched) {
        if (docData?.output) {
          try {
            const parsedOutput = JSON.parse(docData.output);
            editorRef.current?.render(parsedOutput);
            setIsFetched(true);
          } catch (error) {
            console.error('Error parsing document output:', error);
          }
        }
      }
    });

    return unsubscribe;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 p-4">
      <style jsx global>{`
        .codex-editor {
          color: #e2e8f0;
        }
        .ce-block__content, 
        .ce-toolbar__content {
          max-width: 100% !important;
        }
        .cdx-block {
          max-width: 100% !important;
          padding: 0.5rem 0;
          border-bottom: 1px solid #4a5568;
        }
        .ce-toolbar__plus {
          color: #60a5fa;
          background-color: #2d3748;
          left: -40px;
        }
        .ce-toolbar__settings-btn {
          color: #60a5fa;
          background-color: #2d3748;
          right: -40px;
        }
        .cdx-loader {
          --color: #60a5fa;
        }
        .codex-editor svg {
          fill: #e2e8f0;
        }
        .ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover {
          background-color: #4a5568;
        }
        .ce-inline-toolbar, .ce-conversion-toolbar, .ce-settings {
          background-color: #2d3748;
          border-color: #4a5568;
        }
        .ce-inline-toolbar__dropdown, .ce-conversion-toolbar__tools, .ce-settings__button {
          border-color: #4a5568;
        }
        .ce-inline-tool, .ce-conversion-tool, .ce-settings__button {
          color: #e2e8f0;
        }
        .ce-inline-tool:hover, .ce-conversion-tool:hover, .ce-settings__button:hover {
          background-color: #4a5568;
        }
        .cdx-settings-button {
          color: #e2e8f0;
        }
        .cdx-settings-button:hover {
          background-color: #4a5568;
        }
        .ce-popover {
          background-color: #2d3748;
          border-color: #4a5568;
        }
        .ce-popover-item {
          color: #e2e8f0;
        }
        .ce-popover-item:hover {
          background-color: #4a5568;
        }
        .ce-block--selected .cdx-block {
          background-color: #3a4a5e;
        }
        .ce-toolbar__actions {
          right: calc(100% + 40px);
          background: none;
        }
        .ce-toolbar__actions--opened {
          background-color: #2d3748;
        }
        .ce-popover-item--disabled {
          color: #6b7280;
          opacity: 0.6;
        }
      `}</style>
      <div 
        id="editorjs" 
        className="w-full max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 min-h-[calc(100vh-8rem)]"
      ></div>
      <div className="fixed top-10 right-10 z-10">
        <GenerateAITemplate setGenerateAIOutput={(output) => editorRef.current?.render(output)} />
      </div>
    </div>
  );
}

export default RichDocumentEditor;

