
import React from 'react';
import type { HighlightOptionsState } from '../types';

interface IOSSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const IOSSwitch: React.FC<IOSSwitchProps> = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center justify-between cursor-pointer w-full">
            <span className="text-sm text-gray-700">{label}</span>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-colors duration-300"></div>
                <div className="absolute left-0.5 top-0.5 bg-white border border-gray-200 rounded-full h-5 w-5 transition-transform duration-300 transform peer-checked:translate-x-5"></div>
            </div>
        </label>
    );
};

interface HighlightOptionsProps {
    options: HighlightOptionsState;
    onOptionsChange: (options: HighlightOptionsState) => void;
}

const HighlightOptions: React.FC<HighlightOptionsProps> = ({ options, onOptionsChange }) => {
    const handleChange = <T extends keyof HighlightOptionsState,>(key: T, value: HighlightOptionsState[T]) => {
        onOptionsChange({ ...options, [key]: value });
    };

    return (
        <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
                <IOSSwitch
                    label="Làm sản phẩm nổi bật hơn"
                    checked={options.productHighlight}
                    onChange={(checked) => handleChange('productHighlight', checked)}
                />
                 <div className="border-t border-gray-200"></div>
                <IOSSwitch
                    label="Giữ rõ nhãn và chi tiết sản phẩm"
                    checked={options.keepDetails}
                    onChange={(checked) => handleChange('keepDetails', checked)}
                />
                 <div className="border-t border-gray-200"></div>
                <IOSSwitch
                    label="Thêm ánh sáng viền (rim light)"
                    checked={options.rimLight}
                    onChange={(checked) => handleChange('rimLight', checked)}
                />
            </div>
        </section>
    );
};

export default HighlightOptions;
