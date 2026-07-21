export const toggleFollow = async (username) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/follow`, {
            method: "POST",
            credentials: "include",
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const getFollowers = async (username) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/followers`, {
            credentials: "include",
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const getFollowing = async (username) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/following`, {
            credentials: "include",
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
