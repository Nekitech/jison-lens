export const handleDownload = async (
    filename: string,
    filepath: string,
    fn: any,
) => {
    const fileBuffer = await fn.bind(null, filepath)();

    const blob = new Blob([fileBuffer], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};
