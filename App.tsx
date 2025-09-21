
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import StyleSelector from './components/StyleSelector';
import HighlightOptions from './components/HighlightOptions';
import ActionButtons from './components/ActionButtons';
import ImagePreview from './components/ImagePreview';
import { generateAdImage } from './services/geminiService';
import { AdvertisingStyle, HighlightOptionsState } from './types';
import { ADVERTISING_STYLES } from './constants';

const App: React.FC = () => {
    const [modelFile, setModelFile] = useState<File | null>(null);
    const [productFile, setProductFile] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');
    const [selectedStyle, setSelectedStyle] = useState<AdvertisingStyle>(ADVERTISING_STYLES[0]);
    const [highlightOptions, setHighlightOptions] = useState<HighlightOptionsState>({
        productHighlight: true,
        keepDetails: true,
        rimLight: false,
    });
    
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const resetState = useCallback(() => {
        setModelFile(null);
        setProductFile(null);
        setDescription('');
        setSelectedStyle(ADVERTISING_STYLES[0]);
        setHighlightOptions({ productHighlight: true, keepDetails: true, rimLight: false });
        setGeneratedImage(null);
        setIsLoading(false);
        setError(null);
    }, []);

    const handleGenerate = async () => {
        if (!modelFile || !productFile || !description) {
            setError('Vui lòng tải lên cả hai ảnh và nhập mô tả.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const result = await generateAdImage(
                modelFile,
                productFile,
                description,
                selectedStyle,
                highlightOptions
            );
            setGeneratedImage(result);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Đã xảy ra lỗi: ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const isGenerateDisabled = !modelFile || !productFile || !description || isLoading;

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header />
                
                <main className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Controls */}
                    <div className="flex flex-col gap-8">
                        {/* Upload Section */}
                        <section>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FileUpload
                                    id="model-upload"
                                    label="Tải ảnh người mẫu"
                                    onFileChange={setModelFile}
                                    file={modelFile}
                                />
                                <FileUpload
                                    id="product-upload"
                                    label="Tải ảnh sản phẩm"
                                    onFileChange={setProductFile}
                                    file={productFile}
                                />
                            </div>
                        </section>

                        {/* Description Section */}
                        <section>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Mô tả hình ảnh
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="Ví dụ: Người mẫu mặc váy trắng cầm sản phẩm trong không gian sang trọng"
                            />
                        </section>
                        
                        <StyleSelector
                            selectedStyle={selectedStyle}
                            onStyleSelect={setSelectedStyle}
                        />

                        <HighlightOptions
                            options={highlightOptions}
                            onOptionsChange={setHighlightOptions}
                        />
                    </div>

                    {/* Right Column: Preview & Actions */}
                    <div className="flex flex-col gap-8">
                        <ImagePreview 
                            modelFile={modelFile}
                            productFile={productFile}
                            generatedImage={generatedImage}
                            isLoading={isLoading}
                        />

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <ActionButtons
                            isGenerateDisabled={isGenerateDisabled}
                            isDownloadDisabled={!generatedImage || isLoading}
                            isLoading={isLoading}
                            onGenerate={handleGenerate}
                            onReset={resetState}
                            onDownload={() => {
                                if(generatedImage){
                                    const link = document.createElement('a');
                                    link.href = generatedImage;
                                    link.download = 'ai_ad_image_4k.png';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }
                            }}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
