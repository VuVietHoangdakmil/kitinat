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
        if (editorRef.current)
          return editorRef.current.getContent({ format: "raw" });
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
            "removeformat | help | link image | code ",
          image_title: true,
          /* enable automatic uploads of images represented by blob or data URIs*/
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: (cb: any) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.addEventListener("change", (e: any) => {
              const file = e.target.files[0];
              const reader: any = new FileReader();
              reader.addEventListener("load", () => {
                console.log("cb", cb);
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                // const id = "blobid" + new Date().getTime();
                // const blobCache: any =
                //   tinymce?.activeEditor?.editorUpload.blobCache;
                // const base64 = reader.result.split(",")[1];
                // const blobInfo = blobCache.create(id, file, base64);
                // blobCache.add(blobInfo);
                // /* call the callback and populate the Title field with the file name */
                // cb(blobInfo.blobUri(), { title: file.name });
              });
              reader.readAsDataURL(file);
            });
            input.click();
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    );
  }
);
export default EditorCustom;
