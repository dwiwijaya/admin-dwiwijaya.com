import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
// Import MDEditor component correctly
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((module) => module.default),
    { ssr: false }
);

const MDEditorPreview = dynamic(
    () => import("@uiw/react-markdown-preview").then((module) => module.default),
    { ssr: false }
);

function CreateBlog() {
    const [content, setContent] = useState("**Hello world!!!**");
    const {
        register,
        handleSubmit,
        setValue: setFormValue, // Destructure `setValue` from react-hook-form
        formState: { errors },
    } = useForm();

    const onSubmit = async (values) => {
        const data = values;
        data.content = content;
        console.log(data);
    };
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    return (
        <div className="p-2 card">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* Register the hidden input with react-hook-form */}
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input
                    className="w-full bg-background  p-2 rounded-md border-stroke border"
                    type="text"
                    {...register("title")}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tag">Category</label>
                <Select options={options} />
            </div>
            <div className="mb-3">
                <label htmlFor="content">Content</label>
                <MDEditor value={content} onChange={setContent} />
            </div>
            <label>Preview</label>
            <MDEditorPreview
                source={content}
                className="p-3 md:p-4 rounded-lg border border-stroke"
                
            />

            <button className="btn !w-full mt-5 mb-3" type="submit">
                Save
            </button>
        </form>
        </div>
    );
}

export default CreateBlog;
