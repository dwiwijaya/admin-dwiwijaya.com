import { useForm } from "react-hook-form";
import { Label, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import addDocument from "@/services/firebase/crud/addDocument";
import { v4 as uuid } from 'uuid'
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { updateDocument } from "@/services/firebase/crud/updateDocument";

const SkillForm = ({ initialData, action }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {});
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setFormData({ ...formData, [name]: value });
    };
    const onSubmit = async (data) => {
        try {
            // Simpan data ke Firestore
            setLoading(true);
            let result, error; // Declare result and error variables outside the blocks
        
            if (action === 'create') {
                // Perform create action
                ({ result, error } = await addDocument("skills", uuid(), data));
            } else if (action === 'update') {
                // Perform update action
                ({ result, error } = await updateDocument("skills", initialData.id, data));
            }
        
            if (result) {
                router.push("/skill");
                toast.success("Data " + (action === 'create' ? 'created' : 'updated') + " successfully");
            } else {
                toast.error('Failed to ' + (action === 'create' ? 'create' : 'update'));
                console.log("Error:", error);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Failed to add data");
            console.error("Err:", error);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        Object.entries(initialData || {}).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [initialData, setValue]);

    return (
        <div className="card p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex sm:gap-4 justify-center flex-col sm:flex-row">
                    <div id="fileUpload" className="w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                            onChange={handleChange}
                            id="name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <span>This field is required</span>}
                    </div>
                    <div id="fileUpload" className="w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="order" value="Order" />
                        </div>
                        <TextInput
                            id="order"
                            onChange={handleChange}
                            type="number"
                            {...register("order", { required: true })}
                        />
                        {errors.order && <span>This field is required</span>}
                    </div>
                </div>
                <div id="fileUpload" className=" mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="type" value="Type" />
                    </div>
                    <TextInput
                        id="type"
                        onChange={handleChange}
                        {...register("type", { required: true })}
                    />
                    {errors.type && <span>This field is required</span>}
                </div>
                <div id="fileUpload" className=" mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="icon" value="SVG Icon" />
                    </div>
                    <Textarea
                        id="icon"
                        className="h-20 scrollbar-hide"
                        onChange={handleChange}
                        {...register("icon", { required: true })}
                    />
                    {errors.icon && <span>This field is required</span>}
                </div>
                <div className="flex mb-2 justify-end">
                    <button className="btn !w-full mb-3" type="submit">
                        {Loading && <i className="bx bx-loader bx-spin"></i>}
                        {Loading ? "Saving  ..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SkillForm;
