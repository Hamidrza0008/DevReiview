"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }) {
    const router = useRouter();
const { user, loading, initialized } = useAuth();

useEffect(() => {
    if (initialized && !loading && !user) {
        router.replace("/auth/login");
    }
}, [user, loading, initialized]);

  if (!initialized || loading) {
    return <h1>Loading...</h1>;
}
    if (!user) {
        return null;
    }

    return children;
}