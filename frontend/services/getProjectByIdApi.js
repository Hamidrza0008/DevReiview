export const getProjectById  = async(id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}` , {
            method:"GET",
            credentials:"include",
        })

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}