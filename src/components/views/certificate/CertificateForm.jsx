import { FileInput, Label, TextInput } from "flowbite-react";
import React from "react";
import Select from "react-select";

const CertificateForm = () => {

    const options = [
        { value: "aa", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
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
                    <Label htmlFor="organization" value="Organization" />
                </div>
                <TextInput
                    id="organization"
                />
            </div>
            <div id="fileUpload" className=" mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="file" value="Image" />
                </div>
                <FileInput
                    id="file"
                />
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <label className="form-label" htmlFor="skill">Skill</label>
                </div>
                <Select isMulti className="" options={options} />
            </div>
            <div id="fileUpload" className=" mb-6">
                <div className="mb-2 block">
                    <Label htmlFor="crendential" value="Crendential" />
                </div>
                <TextInput
                    id="crendential"
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

export default CertificateForm;
