// SignoutToggle.js

import { useUser } from "@/context/user";
import { SignOut } from "@/services/firebase";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SignoutToggle = () => {
    const user = useUser();
    const {uuid} = user;
    return uuid && (
        <button className='toggle right-[4.5rem]' onClick={SignOut}>
            <i className="icon-logout rotate-180"  />
        </button>
    );
};

export default SignoutToggle;
