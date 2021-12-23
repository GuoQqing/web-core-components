/**
 * 图片上传组件
 */
import React from 'react';
import { Upload, Image, message } from 'antd';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import { omit, isUrl, imageError, getValueFromEventImg } from '../utils';

export interface ImageUploadProps {
  onChange?: (formValue: any) => void; // 表单onChange
  checkSize?: (formValue: any) => Promise<boolean>; // 表单onChange
  value?: any; // 表单value
  disabled?: boolean; // 是否禁用
  max?: number; // 最大上传数量
  listType?: string; // 上传类型
  custUploadButton?: React.ReactNode; // 自定义上传按钮
  renderCustItemoOperate?: (file: any) => React.ReactNode | string; // 渲染自定义每项额外的操作
  customizeAction?: string; // 自定义上传地址
  onUploadSuccess?: (fileList: any) => void; // 图片上传成功回调
  onRemoveSuccess?: (fileList: any) => void; // 图片删除成功回调
  [propsName: string]: any; // 其余回传到Upload的props
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const {
    onChange,
    checkSize,
    value = [],
    max,
    listType,
    custUploadButton,
    renderCustItemoOperate,
    customizeAction,
    onUploadSuccess,
    onRemoveSuccess,
    disabled = false,
  } = props;
  // 上传文件改变时的状态（上传中、完成、失败都会调用这个函数）
  const onChangeImage = async ({ file, fileList }: any) => {
    // 点击移除文件时也会调用这个方法，目前并不需要
    if (file.status === 'removed') return;
    // 接口有变动，请求status === 200并不一定上传成功，response.code === 500时为上传失败
    if (file.status === 'error' || file?.response?.code === '500') {
      message.error(`${file.name}上传失败`);
    }
    // 上传图片成功回调
    if (file.status === 'done' || file?.response?.code === '200') {
      onUploadSuccess && onUploadSuccess(getValueFromEventImg(fileList));
    }
    onChange &&
      onChange(
        [...fileList].map((item) => {
          // 接口有变动，请求status === 200并不一定上传成功，response.code === 500时为上传失败
          if (item.response?.code === '500') {
            return {
              ...item,
              status: 'error',
            };
          }
          return item;
        }),
      );
  };

  // 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除
  const onRemove = (file: any) => {
    const files = value.filter(
      (v: any) => v.key !== file.key || v.url !== file.url,
    );
    onRemoveSuccess && onRemoveSuccess(files);
    onChange && onChange(files);
  };

  // 上传文件之前的钩子，参数为上传的文件
  const beforeUpload = async (file: any) => {
    if (typeof checkSize === 'function') {
      // 上传前检查
      const isCheck = await checkSize(file);
      if (!isCheck) {
        return Upload.LIST_IGNORE;
      }
    }
    const enIndex =
      file.name?.lastIndexOf('.') === -1
        ? file.name?.length
        : file.name?.lastIndexOf('.');
    const fileName = file.name?.substring(0, enIndex);
    if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/g.test(fileName)) {
      message.error('上传失败，图片名称只能含有汉字，数字，字母，下划线');
      return Upload.LIST_IGNORE;
    }
    return file;
  };

  // 上传按钮
  const uploadButton = custUploadButton || (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const currentProps = omit(
    [
      'onChange',
      'checkSize',
      'value',
      'max',
      'custUploadButton',
      'renderCustItemoOperate',
      'customizeAction',
    ],
    props,
  );

  return (
    <Upload
      accept=".jpg, .jpeg, .png"
      itemRender={(originNode, file, _, actions) => {
        return (
          <div>
            {
              // 图片上传完成后 && 上传类型为picture-card，显示Image预览
              file.status === 'done' && listType === 'picture-card' ? (
                <div className="uploadImages">
                  <Image
                    key={file.url}
                    placeholder
                    src={file.url}
                    preview={{
                      mask: (
                        <div>
                          <EyeOutlined
                            style={{ marginRight: 10, fontSize: 16 }}
                          />
                          {!disabled && (
                            <DeleteOutlined
                              style={{ fontSize: 16 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                // 删除当前图片
                                actions.remove();
                              }}
                            />
                          )}
                        </div>
                      ),
                    }}
                  />
                </div>
              ) : (
                originNode
              )
            }
            {
              // 渲染自定义每项额外的操作
              renderCustItemoOperate && file.status === 'done' ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {renderCustItemoOperate(file)}
                </div>
              ) : null
            }
          </div>
        );
      }}
      {...currentProps}
      fileList={value.map((item: any) => {
        let { url } = item;
        if (!isUrl(url)) {
          url = imageError;
        }
        return {
          status: 'done',
          uid: item.url,
          ...item,
          url,
        };
      })}
      action={customizeAction || '/erp/comm/upload'}
      name="uploadFileInput"
      onRemove={onRemove}
      beforeUpload={beforeUpload}
      onChange={onChangeImage}
    >
      {max && value.length >= max ? null : uploadButton}
    </Upload>
  );
};

export default ImageUpload;
