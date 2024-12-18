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
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const { user } = useUser();
  const [isFetched, setIsFetched] = useState(false);

  const saveDocumentDebounced = useCallback(
    debounce(async (outputData) => {
      if (!user || !params?.documentid) return;

      const docRef = doc(db, 'documentOutput', params.documentid);
      await updateDoc(docRef, {
        output: JSON.stringify(outputData),
        editedBy: user.primaryEmailAddress?.emailAddress
      });
    }, 1000),
    [user, params]
  );

  useEffect(() => {
    if (!user || editorRef.current) return;

    const editor = new EditorJS({
      holder: 'editorjs',
      onChange: () => {
        editor.save().then((outputData) => {
          saveDocumentDebounced(outputData);
        });
      },
      tools: {
        header: Header,
        delimiter: Delimiter,
        paragraph: Paragraph,
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
          config: {
            alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
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
          shortcut: 'CMD+SHIFT+C',
          inlineToolbar: true,
        },
        image: SimpleImage,
        code: {
          class: CodeTool,
          shortcut: 'CMD+SHIFT+P'
        },
      },
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [user, saveDocumentDebounced]);

  useEffect(() => {
    if (!user || !params?.documentid) return;

    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params.documentid),
      (docSnapshot) => {
        const data = docSnapshot.data();
        if (!data) return;

        if (data.editedBy !== user.primaryEmailAddress?.emailAddress || !isFetched) {
          if (editorRef.current && data.output) {
            editorRef.current.render(JSON.parse(data.output));
          }
          setIsFetched(true);
        }
      });

    return () => unsubscribe();
  }, [user, params, isFetched]);

  const handleGenerateAIOutput = (output) => {
    if (editorRef.current) {
      editorRef.current.render(output);
    }
  };

  return (
    <div className="relative">
      <div id="editorjs" className="w-[70%]"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
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