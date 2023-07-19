import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import * as _ from 'lodash';

import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

import React, { useEffect, useState } from "react";

export interface UIFileRequest {
    id?: number;
    filename: string;
    mimeType: string;
    extension: string;
    base64: string;
}

type UIFileComponentProps = {
    value?: UIFileRequest | UIFileRequest[];
    disabled?: boolean;
    onChange?: (value: any) => void;
    style?: React.CSSProperties;
    populate?: UIFileRequest | UIFileRequest[];
};

const UIFileComponent: React.FC<UIFileComponentProps> = (props) => {
    const { value, onChange, style, disabled, populate } = props;

    const [fileToUpload, setFileToUpload] = useState<UploadFile[]>([]);
    const [fileUploaderForm, setFileUploaderForm] = useState<UIFileRequest[]>([]);

    useEffect(() => {

        if (fileUploaderForm) {
            console.log('fileUploaderForm', fileUploaderForm);
        }
    }, [fileUploaderForm]);

    useEffect(() => {

        if (populate) {
            console.log('viene un valor en el populate file...', populate);

            if (populate instanceof Array) {

                const addPopulate = populate.map((r) => {

                    return {
                        uid: r.id?.toString()!!,
                        name: r.filename,
                        status: 'done',
                        size: 1000,
                        type: r.mimeType
                    } as UploadFile;
                });

                setFileToUpload(addPopulate);
                setFileUploaderForm(populate);
                onChange!(populate);
            }

        }
    }, [populate]);


    return (
        <Upload
            name='files'
            multiple={true}
            showUploadList={true}
            beforeUpload={(file: RcFile, FileList: RcFile[]) => {

                let extension = file.name.split(".").pop();

                let reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {

                    let base64: string = "";

                    base64 = reader.result?.toString() != null ? reader.result.toString() : '';

                    setFileUploaderForm([...fileUploaderForm, {
                        id: 0,
                        filename: file.name,
                        extension: extension!,
                        mimeType: file.type,
                        base64: base64
                    }])

                    setFileToUpload([...fileToUpload, {
                        uid: file.uid,
                        name: file.name,
                        status: 'done',
                        size: file.size,
                        type: file.type
                    }]);

                    onChange!([...fileUploaderForm, {
                        id: 0,
                        filename: file.name,
                        extension: extension!,
                        mimeType: file.type,
                        base64: base64
                    }]);
                };

                return false;
            }}
            onRemove={(file: UploadFile) => {

                const removeFiles = _.reject(fileUploaderForm, (e) => { return e.filename == file.name && e.mimeType == file.type });
                const removeDefaultFiles = _.reject(fileToUpload, (e) => { return e.name == file.name && e.type == file.type });

                setFileUploaderForm(removeFiles);
                setFileToUpload(removeDefaultFiles);

                onChange!(removeFiles);
            }}
            fileList={fileToUpload ? fileToUpload : undefined}
            >

            <Button icon={<UploadOutlined />}>
                {"Haga click o arrastre su archivo aqui"}
            </Button>
        </Upload>
    );
};

export default UIFileComponent;