
import React, { useMemo } from 'react';

interface ImagePreviewProps {
    modelFile: File | null;
    productFile: File | null;
    generatedImage: string | null;
    isLoading: boolean;
}

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <span className="text-gray-500 text-sm">{text}</span>
    </div>
);

const LoadingSpinner: React.FC = () => (
    <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10 rounded-lg">
        <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-600">AI đang xử lý, vui lòng chờ...</p>
    </div>
);

const ImagePreview: React.FC<ImagePreviewProps> = ({ modelFile, productFile, generatedImage, isLoading }) => {
    const modelPreviewUrl = useMemo(() => modelFile ? URL.createObjectURL(modelFile) : null, [modelFile]);
    const productPreviewUrl = useMemo(() => productFile ? URL.createObjectURL(productFile) : null, [productFile]);

    return (
        <div className="w-full aspect-square relative bg-white border border-gray-200 rounded-lg shadow-sm p-2">
            {isLoading && <LoadingSpinner />}
            <div className="grid grid-cols-2 gap-2 w-full h-full">
                {/* Left: Original */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-center text-sm font-medium text-gray-600">Ảnh gốc</h3>
                    <div className="flex-1">
                        {modelPreviewUrl ? (
                             <img src={modelPreviewUrl} alt="Model Preview" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            <Placeholder text="Ảnh người mẫu" />
                        )}
                    </div>
                    <div className="flex-1">
                        {productPreviewUrl ? (
                            <img src={productPreviewUrl} alt="Product Preview" className="w-full h-full object-contain rounded-md bg-gray-50" />
                        ) : (
                            <Placeholder text="Ảnh sản phẩm" />
                        )}
                    </div>
                </div>

                {/* Right: AI Output */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-center text-sm font-medium text-gray-600">Ảnh quảng cáo AI</h3>
                    <div className="flex-1">
                        {generatedImage ? (
                            <img src={generatedImage} alt="AI Generated Ad" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            <Placeholder text="Kết quả từ AI" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
