import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { FilterTypesEnum, IFilterCriteria, IFilterField } from "./filter-types";
import FilterItem from "./FilterItem";
import { nanoid } from "nanoid";

type FilterProps = {
  fields: IFilterField[];
  onFilter: (criteriaQuery: IFilterCriteria) => void;
};

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const Filter: React.FC<FilterProps> = ({ fields, onFilter }) => {
  const [form] = Form.useForm();
  const [currentFields, setCurrentFields] = useState<
    (IFilterField & { id: string })[]
  >([]);

  useEffect(() => {
    if (fields.length > 0) {
      setCurrentFields(fields.map((f) => ({ ...f, id: nanoid() })));
    }
  }, [fields]);

  const addFilter = () => {
    setCurrentFields([...currentFields, { ...fields[0], id: nanoid() }]);
  };

  const removeFilter = (indexKey: number | string) => {
    setCurrentFields((c) => c.filter((_, index) => index !== indexKey));
    // setCurrentFields([...currentFields.filter((_, index) => index !== indexKey)]);
  };

  const onSubmitFilter = (values: {
    [x: string]: { operator: string; attribute: string; value: string };
  }) => {
    const filterCriteria: IFilterCriteria = { and: [] };

    Object.keys(values).forEach((key) => {
      if (
        values[key].value !== undefined &&
        values[key].attribute !== undefined &&
        (values[key].operator !== undefined ||
          typeof values[key].value === "boolean")
      )
        filterCriteria.and.push({
          [values[key].attribute]: {
            value: values[key].value,
            type: (values[key].operator as FilterTypesEnum) ?? FilterTypesEnum.EQUALS,
          },
        });
    });

    if (filterCriteria.and.length > 0) onFilter(filterCriteria);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="filter"
      onFinish={(values: any) => onSubmitFilter(values)}
    >
      <Form.List name="filterList">
        {(formFields, { add, remove }) => (
          <>
            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                style={{ margin: "0px 10px" }}
                onClick={() => {
                  add();
                  addFilter();
                }}
              >
                Agregar
              </Button>
            </Form.Item>

            {currentFields.map((field, index) =>
              field.default ? (
                <FilterItem
                  key={field.id}
                  defaultField={field}
                  fields={fields}
                  indexKey={index}
                  form={form}
                  onRemoveFilter={(indexKey: number) => {
                    remove(indexKey);
                    removeFilter(indexKey);
                  }}
                />
              ) : null
            )}
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          Aplicar Filtro
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Filter;
