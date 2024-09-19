import { useRef, forwardRef, useImperativeHandle } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { uploadManyFiles } from "../../../services/upload.service";

type Props = {
  initialValue?: string;
  height?: number;
  nameForm?: string[];
};
const EditorCustom = forwardRef<any, Props>(
  ({ initialValue, height = 500, nameForm }, ref) => {
    const form = useFormInstance();
    const editorRef = useRef<TinyMCEEditor>();
    useImperativeHandle(ref, () => ({
      getContent: () => {
        if (editorRef.current)
          return editorRef.current.getContent({ format: "raw" });
      },
    }));

    return (
      <Editor
        onChange={(e: any) => {
          form.setFieldValue(nameForm, e.level.content);
        }}
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
          file_picker_callback: async (cb, _value, meta) => {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = async (e: Event) => {
                const target = e.target as HTMLInputElement;
                const file = target.files?.[0];
                if (file) {
                  try {
                    const formData = new FormData();
                    formData.append("images", file);
                    if (formData.has("images")) {
                      const resFile = await uploadManyFiles(formData);
                      const url = resFile.images[0];
                      cb(url, { title: file.name });
                    }
                  } catch (error) {
                    console.error("Upload failed:", error);
                    // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo cho người dùng)
                  }
                }
              };

              input.click();
            }
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    );
  }
);
export default EditorCustom;
