import { Suspense } from "react";

import ResetPassword from "@/Components/Auth/ResetPassword"

const resetPassword = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPassword />
            </Suspense>        
        </>
    )
}

export default resetPassword;