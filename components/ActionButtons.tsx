
import React from 'react';

interface ActionButtonsProps {
    isGenerateDisabled: boolean;
    isDownloadDisabled: boolean;
    isLoading: boolean;
    onGenerate: () => void;
    onReset: () => void;
    onDownload: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    isGenerateDisabled,
    isDownloadDisabled,
    isLoading,
    onGenerate,
    onReset,
    onDownload,
}) => {
    const baseButton = "w-full sm:w-auto text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";
    const primaryButton = `bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed`;
    const secondaryButton = `bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`;
    
    return (
        <section className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
             <button
                onClick={onGenerate}
                disabled={isGenerateDisabled}
                className={`${baseButton} ${primaryButton}`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang tạo...
                    </>
                ) : "Tạo ảnh"}
            </button>
            <button
                onClick={onReset}
                className={`${baseButton} ${secondaryButton}`}
            >
                Làm lại
            </button>
            <button
                onClick={onDownload}
                disabled={isDownloadDisabled}
                className={`${baseButton} ${primaryButton}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Tải xuống 4K
            </button>
        </section>
    );
};

export default ActionButtons;
