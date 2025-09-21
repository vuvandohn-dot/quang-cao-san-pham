
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="flex items-center justify-center gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-800">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    AI Quảng Cáo Sản Phẩm
                </h1>
            </div>
            <p className="mt-2 text-md text-gray-500">
                Ghép ảnh quảng cáo thông minh với AI
            </p>
        </header>
    );
};

export default Header;
