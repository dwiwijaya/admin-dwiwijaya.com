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
import { init } from "aos";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_TYPES } from "@/constants/data/portfolio";
import convert from "url-slug";

// Import MDEditor component correctly
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((module) => module.default),
    { ssr: false }
);

const MDEditorPreview = dynamic(
    () => import("@uiw/react-markdown-preview").then((module) => module.default),
    { ssr: false }
);

const PortfolioForm = ({ initialData, action, skills }) => {
    const [content, setContent] = useState(initialData?.content || "**Hello world!!!**");
    const [selected, setSelected] = useState(initialData?.skill || []);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.skill = selected
            data.content = content
            data.slug = convert(data.name)
            // update or insert image 
            if ((typeof data.thumbnail === 'string' && data.thumbnail.length > 0)) {
            } else if (!initialData && data.thumbnail.length > 0) {
                data.thumbnail = await uploadFile(data.thumbnail[0], 'portfolio/',);
            } else if (initialData.thumbnail && data.thumbnail.length > 0) {
                await deleteFile(initialData.thumbnail);
                data.thumbnail = await uploadFile(data.thumbnail[0], 'portfolio/',);
            } else if (initialData.thumbnail && data.thumbnail.length === 0) {
                data.thumbnail = initialData.thumbnail;
            }
            const { success, error } = action === 'create'
                ? await addDocument("portfolio", data)
                : await updateDocument("portfolio", initialData.id, data);

            const actionVerb = action === 'create' ? 'created' : 'updated';
            if (success) {
                router.push("/portfolio");
                toast.success(`Data ${actionVerb} successfully`);
            } else {
                setLoading(false);
                toast.error(`Failed to ${actionVerb}`);
                console.error("Error:", error);
            }
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



    return <div className="card p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div id="fileUpload" className="w-full mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                    onChange={handleChange}
                    {...register("name", { required: true })}
                    id="name"
                />
                {errors.name && <span className="text-sm">This field is required</span>}

            </div>
            <div id="fileUpload" className=" mb-4">
                <div className="mb-2 block">
                    <Label className="mr-2" htmlFor="thumbnail" value="Thumbnail" />
                    {initialData && (<><small>{initialData.thumbnail}</small></>)}
                </div>
                <FileInput
                    accept=".png,.jpg,.webp,.jpeg"
                    onChange={handleChange}
                    {...register("thumbnail", { required: !initialData })}
                />
                {errors.thumbnail && <span className="text-sm">This field is required</span>}

            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="category">Category</label>
                </div>
                <Select id="type" onChange={handleChange} {...register("category", { required: true })} defaultValue="">
                    <option value="" disabled hidden>Choose category ...</option>
                    {PORTFOLIO_CATEGORIES.map((option,index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Select>
                {errors.category && <span className="text-sm">This field is required</span>}
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="type">Type</label>
                </div>
                <Select id="type" onChange={handleChange} {...register("type", { required: true })} defaultValue="">
                    <option value="" disabled hidden>Choose type ...</option>
                    {PORTFOLIO_TYPES.map((type,index) => (
                        <option key={index} value={type.value}>{type.label}</option>
                    ))}
                </Select>
                {errors.category && <span className="text-sm">This field is required</span>}
            </div>
            <div id="fileUpload" className="w-full mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="githubLink" value="Github Link" />
                </div>
                <TextInput
                    onChange={handleChange}
                    {...register("githubLink", { required: false })}
                    id="githubLink"
                />
                {errors.githubLink && <span className="text-sm">This field is required</span>}

            </div>
            <div id="fileUpload" className="w-full mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="demoLink" value="Demo Link" />
                </div>
                <TextInput
                    onChange={handleChange}
                    {...register("demoLink", { required: false })}
                    id="demoLink"
                />
                {errors.demoLink && <span className="text-sm">This field is required</span>}

            </div>
            <label className="inline-flex items-center cursor-pointer mb-4">
                <input  {...register("isFeatured", { required: true })} type="checkbox" value="" className="sr-only peer" />
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
                {errors.excerpt && <span className="text-sm">This field is required</span>}

            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="skill">Skill</label>
                </div>
                <ReactSelect className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    value={selected}
                    name="skill"
                    onChange={setSelected}
                    isMulti options={mappedSkills} />
                {errors.skill && <span className="text-sm">This field is required</span>}

            </div>
            <div className="mb-6">
                <div className="mb-2">
                    <label className="form-label" htmlFor="content">Content</label>
                </div>
                <MDEditor
                    {...register("content")}
                    preview="edit" value={content}
                    onChange={setContent}
                />
                {errors.content && <span className="text-sm">This field is required</span>}

            </div>

            <div className="flex mb-2 justify-end">
                <Button isLoading={Loading} className="!w-full" type="submit">
                    Save
                </Button>
            </div>
        </form>
    </div>;
};

export default PortfolioForm;
