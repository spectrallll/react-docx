import { FieldDTO } from "../../../business-logic/dto/field";

export function transformArrayToObject(arr: FieldDTO[]) {
  const result: Record<string, string> = {};
  arr.forEach(item => {
    const variable = item.variable;
    result[variable] = item.value;
  });
  return result;
}