import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import GenerateAITemplate from './GenerateAITemplate';
import debounce from 'lodash.debounce';

function RichDocumentEditor({ params }) {
  const ref = useRef();
  const editorRef = useRef(null);
  const { user } = useUser();
  const [documentOutput, setDocumentOutput] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  // Moved InitEditor function outside useEffect
  const InitEditor = () => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        onChange: (api, event) => {
          SaveDocument();
        },
        onReady: () => {
          GetDocumentOutput();
        },
        holder: 'editorjs',
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
            },
          },
          table: Table,
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
            config: {
              defaultStyle: 'unordered',
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
            shortcut: 'CMD+SHIFT+P',
          },
        },
      });
    }
  };

  useEffect(() => {
    if (user && !editorRef.current) {
      InitEditor();
    }
  }, [user]);  // Now only depend on user state

  const SaveDocument = debounce(() => {
    ref.current.save().then(async (outputData) => {
      const docRef = doc(db, 'documentOutput', params?.documentid);
      await updateDoc(docRef, {
        output: JSON.stringify(outputData),
        editedBy: user?.primaryEmailAddress?.emailAddress,
      });
    });
  }, 1000);

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid), (doc) => {
      const docData = doc.data();
      if (docData?.editedBy !== user?.primaryEmailAddress?.emailAddress || !isFetched) {
        if (docData?.output) {
          editorRef.current?.render(JSON.parse(docData.output));
          setIsFetched(true);
        }
      }
    });
  };

  return (
    <div className="">
      <div id="editorjs" className="w-[70%]"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <GenerateAITemplate setGenerateAIOutput={(output) => editorRef.current?.render(output)} />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
