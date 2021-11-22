export const getError = (error) => {
    const errorMessage = "An Error Occured, please try again.";

    if (!error.response) {
        console.error(`API not found`);
        return errorMessage;
    }
    // if (process.env.NODE_ENV === "development") {
    //     console.error(error.response.data);
    //     console.error(error.response.status);
    //     console.error(error.response.headers);
    // }
    if (error.response.data && error.response.data.errors) {
        return error.response.data.errors;
    }

    return errorMessage;
};
export default getError;