import { EditorContent, useEditor } from "@tiptap/react";
import StarterKid from "@tiptap/starter-kit";
import Menubar from "./menubar";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

const RichCodeEditor = ({ field }: { field: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKid,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value
      ? JSON.parse(field.value)
      : "<p>Make you document here 🚀</p>",
    immediatelyRender: false,
  });

  return (
    <div className="shadow-xs overflow-hidden rounded-lg dark:border dark:border-input">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichCodeEditor;
