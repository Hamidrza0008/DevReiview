import { Suspense } from "react";
import Login, { LoginSkeleton } from "@/Components/Auth/Login"

const LoginPage = () => {
    return (
        <>
            <Suspense fallback={<LoginSkeleton/>}>
                <Login />
            </Suspense>
            </>
    )
}
export default LoginPage;