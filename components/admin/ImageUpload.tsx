'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = 'الصورة' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview locally
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        try {
            setUploading(true);

            // Upload via our secure API route (bypasses RLS)
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bucket', 'media');

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'فشل الرفع');
            }

            onChange(result.url);
            setPreview(result.url);
        } catch (error: any) {
            console.error('Upload error:', error);
            alert(`فشل رفع الصورة: ${error.message}`);
            setPreview(value); // revert
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview('');
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <ImageIcon size={16} />
                {label}
            </label>

            <div
                className={cn(
                    "relative group h-48 w-full border-2 border-dashed rounded-2xl overflow-hidden transition-all flex flex-col items-center justify-center gap-3",
                    preview ? "border-transparent" : "border-gray-200 hover:border-primary-300 hover:bg-primary-50/30",
                    uploading && "opacity-50 pointer-events-none"
                )}
            >
                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 bg-white rounded-lg text-dark hover:bg-gray-100 transition-colors shadow-lg"
                                title="تغيير الصورة"
                            >
                                <Upload size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={removeImage}
                                className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors shadow-lg"
                                title="حذف الصورة"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary-500 group-hover:scale-110 transition-all">
                            <Upload size={24} />
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-sm font-bold text-primary-600 hover:underline"
                            >
                                اضغط لرفع صورة
                            </button>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP حتى 5MB</p>
                        </div>
                    </>
                )}

                {uploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-2" />
                        <p className="text-xs font-bold text-primary-600">جاري الرفع...</p>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}
