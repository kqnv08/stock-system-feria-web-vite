import { message } from "antd";
import Modal, { ModalProps } from "antd/lib/modal/Modal";
import { GraphQLError } from "graphql";
import React from "react";
import { ReactComponent as CloseIcon } from '../../assets/svg/close-icon.svg';

type BaseModel = {
    id: string;
};

type ModalFormProps<T extends BaseModel> = ModalProps & {
    title: string;
    opened: boolean;
    editing?: Partial<T>;
    onClose?: () => void;
    onSuccess?: () => void;
    onError?: (errors: readonly GraphQLError[]) => void;

    update?: (
        id: string,
        data: Partial<T>
    ) => Promise<readonly GraphQLError[] | undefined>;
    create?: (data: Partial<T>) => Promise<readonly GraphQLError[] | undefined>;
};

function ModalForm<T extends BaseModel>(props: React.PropsWithChildren<ModalFormProps<T>>) {
    const save = async (id: string | undefined, data: Partial<T>) => {
        try {
            const errors = id ? await props.update!(id, data) : await props.create!(data);

            if (errors) {
                message.error("Ha ocurrido un error al realizar la operación");
                if (props.onError) props.onError(errors)
            }
            else {
                message.success("Operación realizada con exito");

                if (props.onSuccess) props.onSuccess();
                if (props.onClose) props.onClose();
            }
        } catch (error) {
            message.error("Ha ocurrido un error al realizar la operación");
        }
    };

    const getChildren = (children: React.ReactNode, editing?: Partial<T>) => {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                record: editing,
                onSubmit: (record: T) => save(editing?.id, record)
            });
        }
    };

    return (
        <Modal
            {...props}
            title={props.title}
            destroyOnClose
            width={props.width}
            visible={props.opened}
            onCancel={props.onClose}
            footer={null}
            closeIcon={<CloseIcon />}
        >
            <div className="comafi-divider"></div>
           <br/> 
            {getChildren(props.children, props.editing)}
        </Modal>
    );
}

export default ModalForm;
