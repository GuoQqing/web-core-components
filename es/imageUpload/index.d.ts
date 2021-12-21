/**
 * 图片上传组件
 */
import React from "react";
export interface ImageUploadProps {
    onChange?: (formValue: any) => void;
    checkSize?: (formValue: any) => Promise<boolean>;
    value?: any;
    disabled?: boolean;
    max?: number;
    listType?: string;
    custUploadButton?: React.ReactNode;
    renderCustItemoOperate?: (file: any) => React.ReactNode | string;
    customizeAction?: string;
    onUploadSuccess?: (fileList: any) => void;
    onRemoveSuccess?: (fileList: any) => void;
    [propsName: string]: any;
}
declare const ImageUpload: React.FC<ImageUploadProps>;
export default ImageUpload;
