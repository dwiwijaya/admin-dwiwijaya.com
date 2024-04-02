import { Label, TextInput } from "flowbite-react";
import React from "react";

const SkillForm = () => {
    return <div className="card p-2">
        <form action="">
            <div className="flex gap-4 justify-center">
            <div id="fileUpload" className="w-full mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                    id="name"
                />
            </div>
            <div id="fileUpload" className="min-w-6 mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="order" value="Order" />
                </div>
                <TextInput
                    id="order"
                    type="number"
                />
            </div>
            </div>
            <div id="fileUpload" className=" mb-6">
                <div className="mb-2 block">
                    <Label htmlFor="icon" value="SVG Icon" />
                </div>
                <TextInput
                    id="icon"
                />
            </div>
            <div className="flex mb-2 justify-end">
            <button className="btn !w-20" type="submit">
                Save
            </button>

            </div>
        </form>
    </div>;
};

export default SkillForm;
