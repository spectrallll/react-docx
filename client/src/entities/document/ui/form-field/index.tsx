import { Col, Form, Input, Row } from "antd";
import { ReactNode } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { useFormField } from "@/entities/document/model/form";

interface FormFieldProps {
  id: number;
  label: string;
  actions?: ReactNode;
  className?: string;
}

export const FormField = ({ id, label, actions, className }: FormFieldProps) => {
  const [variable, value, onChangeVariable, onChangeValue] = useFormField(id);
  return (
    <Form.Item label={label} className={classNames(className)} style={{ marginBottom: 0 }}>
      <Row gutter={20}>
        <Col>
          <Form.Item
            className={styles.field}
            rules={[{ required: true }]}
          >
            <Input onChange={onChangeVariable} placeholder="Variable" value={variable}/>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            className={styles.field}
            rules={[{ required: true }]}
          >
            <Input onChange={onChangeValue} placeholder="Value" value={value} />
          </Form.Item>
        </Col>
        <Col>
          {actions}
        </Col>
      </Row>
    </Form.Item>
  )
}
