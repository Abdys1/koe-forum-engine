type FormDataValue = string | number | boolean | Blob;

export function toFormData(body: Record<string, FormDataValue | FormDataValue[] | undefined>): FormData {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
        const values = Array.isArray(value) ? value : [value];
        values.forEach(item => {
            if (item !== undefined) {
                formData.append(key, item instanceof Blob ? item : String(item));
            }
        });
    });
    return formData;
}
