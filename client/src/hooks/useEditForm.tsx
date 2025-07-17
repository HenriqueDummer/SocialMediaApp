import { useState } from "react";
import { PostType, UserType } from "../types/types";

export const useEditForm = <T extends UserType | PostType>(initialData: T) => {
    const [formData, setFormData] = useState<T>(initialData);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const clearSelectedFile = () => {
        setFormData((prev) => ({ ...prev, selectedFile: "" } as T));
    };

    const resetForm = () => {
        setFormData(initialData);
    };

    return {
        formData,
        handleInputChange,
        handleImageInputChange,
        clearSelectedFile,
        resetForm,
    };
};