import { Button, PageHeader, Space, Tag, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Product } from "../../../gql/graphql";
import TableWrapper, { QueryCriteria } from "../../../components/table-wrapper/TableWrapper";
import { GET_PRODUCTS } from "./products.gql";

const columns: ColumnsType<Product> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <div>{text?.toUpperCase()}</div>,
    },

    {
        title: 'Descripción',
        key: 'description',
        dataIndex: 'description',
        render: (_, { description, id }) => (
            <>

                <Tag color={"geekblue"} key={id}>
                    {description?.toUpperCase()}
                </Tag>
            </>
        ),
    },
    {
        title: 'Acciones',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a key={"edit"}>Edit</a>
                <a key={"delete"}>Delete</a>
            </Space>
        ),
    },
];

function ProductList() {

    const { data: productList, loading: productListLoading, refetch: productListRefetch } = useQuery(GET_PRODUCTS, { variables: { productCriteria: {} } })

    const [tableCriteria, setTableCriteria] = useState<QueryCriteria>();

    const handleCreate = () => {
        console.log("create")
    };

    const handleEdit = (row: any) => {
        // setLocation(routeWithParams(PRIVATE_ROUTE.ROLES_EDIT, [row.id]));
    };

    const handleDelete = async (row: any) => {
        try {
            // const { errors } = await roleDeleteMutation({
            //   variables: {
            //     id: row.id,
            //   },
            // });

            // message.success("Se ha eliminado el registro");

            // execute()
        } catch (error) {
            // message.error("Ha ocurrido un error al realizar la operación");
        }
    };

    useEffect(() => {
        console.log("productList", productList)
    }, [productList])

    useEffect(() => {
        if (tableCriteria) {
            productListRefetch()
        }
    }, [tableCriteria]);

    return (

        <>
            <PageHeader
                title="Productos"
                extra={[
                    <Button
                        type="primary"
                        style={{ float: "right" }}
                        onClick={handleCreate}
                        key={"createButton"}
                    >
                        Nuevo
                    </Button>,
                ]}
            />
            <TableWrapper
                columns={columns}
                dataSource={productList?.productListPage?.data as Product[]}
                loading={productListLoading}
                useDefaultMenu={false}
                onCriteriaChange={setTableCriteria}
                onUpdate={handleEdit}
                onDelete={handleDelete}
                pageInfo={{
                    pageSize: 10,
                    total: productList?.productListPage?.totalRecords ?? 0,
                }}
            ></TableWrapper>
        </>
    )
}

export default ProductList
