import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal } from "antd";
import React from "react";

type TableActionProps = {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const TableActions: React.FC<TableActionProps> = ({ onEditClick, onDeleteClick, children }) => {
  const confirmDelete = () => {
    Modal.confirm({
      title: "Eliminar registro",
      icon: <ExclamationCircleOutlined />,
      content: `¿Está seguro que desea eliminar el registro?`,
      okText: "Aceptar",
      cancelText: "Cancelar",
      onOk: () => (onDeleteClick ? onDeleteClick() : undefined),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          {onEditClick ? (
            <Menu.Item key="edit" icon={<EditOutlined />} onClick={onEditClick}>
              Editar
            </Menu.Item>
          ) : null}

          {children}

          {onDeleteClick ? (
            <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={confirmDelete}>
              Eliminar
            </Menu.Item>
          ) : null}
        </Menu>
      }
    >
      <MoreOutlined />
    </Dropdown>
  );
};

export default TableActions;
