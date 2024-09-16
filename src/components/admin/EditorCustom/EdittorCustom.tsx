import { useRef, forwardRef, useImperativeHandle } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
type Props = {
  initialValue?: string;
  height?: number;
};
const EditorCustom = forwardRef<any, Props>(
  ({ initialValue, height = 500 }, ref) => {
    const editorRef = useRef<TinyMCEEditor>();
    useImperativeHandle(ref, () => ({
      getContent: () => {
        if (editorRef.current) return editorRef.current.getContent();
      },
    }));

    return (
      <Editor
        apiKey="3qqcz9fjuhbmqgqdy3ujxx4oyt1jgm986gq6o52dzmrba3cu"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    );
  }
);
export default EditorCustom;
