import React, { useEffect, useRef, useState, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const { user } = useUser();
  const [isFetched, setIsFetched] = useState(false);
  const [initialContent, setInitialContent] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const saveDocumentDebounced = useCallback(
    debounce(async (outputData) => {
      if (!user || !params?.documentid) return;

      const docRef = doc(db, 'documentOutput', params.documentid);
      await updateDoc(docRef, {
        output: JSON.stringify(outputData),
        editedBy: user.primaryEmailAddress?.emailAddress
      });
    }, 2000),
    [user, params]
  );

  useEffect(() => {
    if (!user || !params?.documentid) return;

    const fetchInitialContent = async () => {
      const docRef = doc(db, 'documentOutput', params.documentid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().output) {
        setInitialContent(JSON.parse(docSnap.data().output));
      }
      setIsFetched(true);
    };

    fetchInitialContent();
  }, [user, params]);

  useEffect(() => {
    if (!user || editorRef.current || !isFetched) return;

    const editor = new EditorJS({
      holder: 'editorjs',
      data: initialContent,
      onChange: () => {
        editor.save().then((outputData) => {
          saveDocumentDebounced(outputData);
        });
      },
      onReady: () => {
        setIsEditorReady(true);
      },
      autofocus: true,
      tools: {
        header: Header,
        delimiter: Delimiter,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
          config: {
            defaultType: 'primary',
            messagePlaceholder: 'Enter something',
          }
        },
        table: Table,
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L',
          config: {
            defaultStyle: 'unordered'
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        image: SimpleImage,
        code: CodeTool,
      },
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [user, saveDocumentDebounced, initialContent, isFetched]);

  useEffect(() => {
    if (!user || !params?.documentid || !isEditorReady) return;

    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params.documentid),
      (docSnapshot) => {
        const data = docSnapshot.data();
        if (!data || !data.output) return;

        if (data.editedBy !== user.primaryEmailAddress?.emailAddress && editorRef.current) {
          const newContent = JSON.parse(data.output);
          editorRef.current.render(newContent);
        }
      });

    return () => unsubscribe();
  }, [user, params, isEditorReady]);

  const handleGenerateAIOutput = useCallback((output) => {
    if (editorRef.current) {
      editorRef.current.render(output);
    }
  }, []);

  return (
    <div className="relative">
      <div id="editorjs" className="w-full"></div>
      <div className="fixed bottom-10 left-10 z-10">
        <GenerateAITemplate setGenerateAIOutput={handleGenerateAIOutput} />
      </div>
    </div>
  );
}

export default RichDocumentEditor;

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}