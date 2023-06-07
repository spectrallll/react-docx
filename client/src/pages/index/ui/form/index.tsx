import { Form } from "antd";
import {FormField} from "@/entities/document/ui/form-field";
import { $fieldsList } from "@/entities/document/model/form";
import { useList } from "effector-react";


export const FormDoc = () => {
  return (
    <Form>
      {useList($fieldsList, (field, index) => <FormField id={field.id} key={field.id} label={`Field ${index + 1}`} />)}
    </Form>
  )
}