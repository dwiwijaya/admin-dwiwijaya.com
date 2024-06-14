import React, { useEffect } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Accordion, FileInput, Label, TextInput, Textarea, Select } from "flowbite-react";
import { useRouter } from "next/router";
import { deleteFile, uploadFile } from "@/services/firebase/fileHandler";
import addDocument from "@/services/firebase/crud/addDocument";
import { updateDocument } from "@/services/firebase/crud/updateDocument";
import toast from "react-hot-toast";
import Button from "@/components/common/Button";
import ReactSelect from "react-select";

// Import MDEditor component correctly
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((module) => module.default),
    { ssr: false }
);

const MDEditorPreview = dynamic(
    () => import("@uiw/react-markdown-preview").then((module) => module.default),
    { ssr: false }
);

const PortfolioFormCopy = ({ initialData, action, skills }) => {
    const [content, setContent] = useState("**Hello world!!!**");
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {});
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const onSubmit = async (data) => {
        console.log(data);
        try {
            setLoading(true);
            console.log(data);
            console.log(selected);
            console.log(content);
            // if ((typeof data.image === 'string' && data.image.length > 0)) {
            // } else if (!initialData && data.image.length > 0) {
            //     data.image = await uploadFile(data.image[0], 'portfolio/',);
            // } else if (initialData.image && data.image.length > 0) {
            //     await deleteFile(initialData.image);
            //     data.image = await uploadFile(data.image[0], 'portfolio/',);
            // } else if (initialData.image && data.image.length === 0) {
            //     data.image = initialData.image;
            // }
            // const { success, error } = action === 'create'
            //     ? await addDocument("portfolio", data)
            //     : await updateDocument("portfolio", initialData.id, data);

            // const actionVerb = action === 'create' ? 'created' : 'updated';
            // if (success) {
            //     router.push("/portfolio");
            //     toast.success(`Data ${actionVerb} successfully`);
            // } else {
            //     setLoading(false);
            //     toast.error(`Failed to ${actionVerb}`);
            //     console.error("Error:", error);
            // }
        } catch (err) {
            setLoading(false);
            console.error("An error occurred:", err);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        Object.entries(initialData || {}).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [initialData, setValue]);

    let mappedSkills = skills.map(item => ({
        value: item.id,
        label: item.name
    }));

    const category = [
        { value: "code", label: "Code" },
        { value: "uiux", label: "UI-UX" },
        { value: "design", label: "Design" },
        { value: "other", label: "Other" },
    ];
    const [selected, setSelected] = useState([]);

    return <div className="card p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div id="fileUpload" className="w-full mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                    onChange={handleChange}
                    {...register("name", { required: true })}
                />
            </div>
            <div id="fileUpload" className=" mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="thumbnail" value="Thumbnail" />
                </div>
                <FileInput
                    onChange={handleChange}
                    {...register("thumbnail", { required: true })}
                />
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="category">Category</label>
                </div>
                <Select id="type" onChange={handleChange} {...register("type", { required: true })} defaultValue="">
                    <option value="" disabled hidden>Choose type</option>
                    <option value="frontend">Front-end</option>
                    <option value="backend">Back-end</option>
                    <option value="utility">Utility</option>
                </Select>
                {errors.type && <span className="text-sm">This field is required</span>}
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
                    onChange={handleChange}
                    {...register("excerpt", { required: true })}
                />
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="skill">Skill</label>
                </div>
                <ReactSelect className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    value={selected}
                    onChange={setSelected}
                    isMulti options={mappedSkills} />
            </div>
            <div className="mb-6">
                <div className="mb-2">
                    <label className="form-label" htmlFor="content">Content</label>
                </div>
                <MDEditor
                    {...register("organization", { required: true })}
                    preview="edit" value={content} onChange={setContent} />
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
                <Button isLoading={Loading} className="!w-full" type="submit">
                    Save
                </Button>
            </div>
        </form>
    </div>;
};

export default PortfolioFormCopy;
