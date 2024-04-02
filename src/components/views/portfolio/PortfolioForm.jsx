import React from "react";
import Select from "react-select";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Accordion, FileInput, Label, TextInput, Textarea } from "flowbite-react";
// Import MDEditor component correctly
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((module) => module.default),
    { ssr: false }
);

const MDEditorPreview = dynamic(
    () => import("@uiw/react-markdown-preview").then((module) => module.default),
    { ssr: false }
);

const PortfolioForm = () => {

    const [content, setContent] = useState("**Hello world!!!**");
    const skills = [
        { value: "aa", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    const category = [
        { value: "code", label: "Code" },
        { value: "uiux", label: "UI-UX" },
        { value: "design", label: "Design" },
        { value: "other", label: "Other" },
    ];

    return <div className="card p-2">
        <form action="">
            <div id="fileUpload" className="w-full mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                    id="name"
                />
            </div>
            <div id="fileUpload" className=" mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="file" value="Thumbnail" />
                </div>
                <FileInput
                    id="file"
                />
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="category">Category</label>
                </div>
                <Select className="" options={category} />
            </div>
            <label className="inline-flex items-center cursor-pointer mb-4">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Featured Work</span>
            </label>
            <div id="fileUpload" className=" mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="excerpt" value="Excerpt" />
                </div>
                <Textarea
                    id="excerpt"
                />
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="skill">Skill</label>
                </div>
                <Select isMulti className="" options={skills} />
            </div>
            <div className="mb-6">
                    <div className="mb-2">
                        <label className="form-label" htmlFor="content">Content</label>
                    </div>
                    <MDEditor preview="edit" value={content} onChange={setContent} />
                </div>
                <div className="mb-4">
                    <Accordion collapseAll>
                        <Accordion.Panel>
                            <Accordion.Title className="p-2">Show Preview</Accordion.Title>
                            <Accordion.Content className="p-0">
                                <MDEditorPreview
                                    source={content}
                                    className="p-3 md:p-4 rounded-lg"
                                />

                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>

            <div className="flex mb-2 justify-end">
                <button className="btn !w-20" type="submit">
                    Save
                </button>

            </div>
        </form>
    </div>;
};

export default PortfolioForm;
