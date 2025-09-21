
import React from 'react';
import { AdvertisingStyle } from '../types';
import { ADVERTISING_STYLES } from '../constants';

interface StyleSelectorProps {
    selectedStyle: AdvertisingStyle;
    onStyleSelect: (style: AdvertisingStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleSelect }) => {
    return (
        <section>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Chọn phong cách quảng cáo</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ADVERTISING_STYLES.map((style) => (
                    <button
                        key={style}
                        onClick={() => onStyleSelect(style)}
                        className={`p-4 text-center rounded-lg border transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            selectedStyle === style
                                ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {style}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default StyleSelector;
