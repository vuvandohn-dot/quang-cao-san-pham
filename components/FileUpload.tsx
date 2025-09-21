
import React, { useState, useMemo, useCallback } from 'react';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../constants';

interface FileUploadProps {
    id: string;
    label: string;
    onFileChange: (file: File | null) => void;
    file: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ id, label, onFileChange, file }) => {
    const [error, setError] = useState<string | null>(null);

    const previewUrl = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return null;
    }, [file]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
                setError(`File quá lớn. Tối đa ${MAX_FILE_SIZE_MB}MB.`);
                onFileChange(null);
                return;
            }
            if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                setError('Chỉ chấp nhận ảnh JPG hoặc PNG.');
                onFileChange(null);
                return;
            }
            setError(null);
            onFileChange(selectedFile);
        }
    }, [onFileChange]);

    const handleRemove = () => {
        onFileChange(null);
    }

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center relative group overflow-hidden bg-gray-50">
                {previewUrl ? (
                    <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                            <button 
                                onClick={handleRemove} 
                                className="opacity-0 group-hover:opacity-100 text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center transition-opacity duration-300"
                                aria-label="Remove image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <input id={id} type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" />
                        <button type="button" onClick={() => document.getElementById(id)?.click()} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                            Chọn ảnh
                        </button>
                        <p className="mt-2 text-xs text-gray-500">Ảnh JPG/PNG, tối đa {MAX_FILE_SIZE_MB}MB</p>
                    </div>
                )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default FileUpload;
