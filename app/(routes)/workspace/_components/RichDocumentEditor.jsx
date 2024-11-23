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
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const { user } = useUser();
  const [isFetched, setIsFetched] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', content: 'Task 1' },
        { id: '2', content: 'Task 2' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
    },
  ]);
  const [newTask, setNewTask] = useState('');

  const InitEditor = () => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        autofocus: true,
        onChange: debounce(() => {
          SaveDocument();
        }, 1000),
        onReady: () => {
          editorRef.current = editor;
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
          code: {
            class: CodeTool,
          },
        },
        placeholder: 'Start writing your document...',
        data: {},
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);
    
    if (sourceColumn && destColumn) {
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = source.droppableId === destination.droppableId 
        ? sourceTasks 
        : [...destColumn.tasks];

      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks };
        }
        return col;
      }));
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    
    setColumns(columns.map(col => {
      if (col.id === 'todo') {
        return {
          ...col,
          tasks: [...col.tasks, { id: Date.now().toString(), content: newTask }]
        };
      }
      return col;
    }));
    setNewTask('');
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
          color: #e2e8f0 !important;
        }
        .ce-inline-toolbar__dropdown, .ce-conversion-toolbar__tools, .ce-settings__button {
          border-color: #4a5568;
          color: #e2e8f0 !important;
        }
        .ce-inline-tool, .ce-conversion-tool, .ce-settings__button {
          color: #e2e8f0 !important;
        }
        .ce-inline-tool:hover, .ce-conversion-tool:hover, .ce-settings__button:hover {
          background-color: #4a5568;
        }
        .cdx-settings-button {
          color: #e2e8f0 !important;
        }
        .cdx-settings-button:hover {
          background-color: #4a5568;
        }
        .ce-popover {
          background-color: #2d3748;
          border-color: #4a5568;
          color: #e2e8f0 !important;
        }
        .ce-popover-item {
          color: #e2e8f0 !important;
          padding: 6px 10px;
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
          color: #6b7280 !important;
          opacity: 0.6;
        }
        .ce-popover--opened {
          background-color: #1f2937;
          border-color: #4b5563;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .ce-popover-item {
          color: #f3f4f6 !important;
          opacity: 1 !important;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ce-popover-item__icon {
          background-color: #4b5563;
          border-radius: 4px;
          opacity: 1 !important;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ce-popover-item__title {
          font-weight: 500;
          color: #f3f4f6 !important;
          opacity: 1 !important;
          font-size: 14px;
        }
        .ce-popover-item__secondary-title {
          color: #9ca3af !important;
          opacity: 1 !important;
          font-size: 12px;
        }
      `}</style>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Document Editor</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <div 
            id="editorjs" 
            className="w-full max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 min-h-[calc(100vh-12rem)]"
          ></div>
        </TabsContent>
        
        <TabsContent value="kanban">
          <div className="p-4">
            <div className="mb-4 flex gap-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task..."
                className="max-w-sm"
              />
              <Button onClick={addTask}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map(column => (
                  <Card key={column.id}>
                    <CardHeader>
                      <CardTitle>{column.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Droppable droppableId={column.id}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="min-h-[200px]"
                          >
                            {column.tasks.map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-3 mb-2 bg-secondary rounded-lg"
                                  >
                                    {task.content}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DragDropContext>
          </div>
        </TabsContent>
      </Tabs>

      <div className="fixed top-10 right-10 z-10">
        <GenerateAITemplate setGenerateAIOutput={(output) => editorRef.current?.render(output)} />
      </div>
    </div>
  );
}

export default RichDocumentEditor;

