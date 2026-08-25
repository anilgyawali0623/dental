"use client";

import { useUser } from "@clerk/nextjs";
import {syncUser} from "@/lib/actions/users";
import { useEffect } from "react";

function UserSync() {
    const { isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        const handleUserSync = async () => {
            if (isLoaded && isSignedIn) {
                try {
                    await syncUser();
                } catch (error) {
                    console.log("failed to sync", error);
                }
            }


        }
        handleUserSync();
    }, [isLoaded, isSignedIn])


    return null;

}


export default UserSync;
