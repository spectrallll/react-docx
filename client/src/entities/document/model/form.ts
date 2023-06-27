import { combine, createApi, createEffect, createStore } from "effector";
import type { Field } from "./types";
import { normalize, schema } from "normalizr";
import { useStoreMap } from "effector-react";
import { ChangeEvent, useCallback } from "react";


export const mockFields: Field[] = [
  {id: 1, value: "Naro", variable: "first_name"},
  {id: 2, value: "Tash", variable: "last_name"},
  {id: 3, value: "25", variable: "age"},
]
export const fieldSchema = new schema.Entity("fields");
export const normalizeField = (data: Field) => normalize(data, fieldSchema);
export const normalizeFields = (data: Field[]) => normalize(data, [fieldSchema])

export const getFieldsFx = createEffect(() => {
  return Promise.resolve(mockFields);
})

const fieldsInitialState: Record<number, Field> = {};
export const $fields = createStore(fieldsInitialState)
  .on(getFieldsFx.doneData, (_, payload) => {
    return normalizeFields(payload).entities.fields;
  })

export const formApi = createApi($fields, {
  changeVariable(state, payload: { variable: string; id: number }) {
    const newState = {...state};
    newState[payload.id].variable = payload.variable;
    return newState;
  },
  changeValue(state, payload: { value: string; id: number }) {
    const newState = {...state};
    newState[payload.id].value = payload.value;
    return newState;
  }
});

export const $fieldsList = combine($fields, (fields) => Object.values(fields));

type UseFormFieldReturn = [string, string, (e: ChangeEvent<HTMLInputElement>) => void, (e: ChangeEvent<HTMLInputElement>) => void]
export function useFormField(fieldId: number): UseFormFieldReturn {

  const variable = useStoreMap($fields, state => state[fieldId].variable);
  const value = useStoreMap($fields, state => state[fieldId].value);

  const onChangeVariable = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    formApi.changeVariable({ variable: e.currentTarget.value, id: fieldId })
  }, [fieldId]);

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    formApi.changeValue({ value: e.currentTarget.value, id: fieldId });
  }, [fieldId]);

  return [variable, value, onChangeVariable, onChangeValue];
}

//refactor
/* import { combine, createApi, createEffect, createStore } from "effector";
import { normalize, schema } from "normalizr";
import { useStoreMap } from "effector-react";
import { ChangeEvent, useCallback } from "react";

import type { Field } from "./types";

export const mockFields: Field[] = [
  { id: 1, value: "Naro", variable: "first_name" },
  { id: 2, value: "Tash", variable: "last_name" },
  { id: 3, value: "25", variable: "age" },
];

const fieldSchema = new schema.Entity("fields");

export const normalizeField = (data: Field) => normalize(data, fieldSchema);
export const normalizeFields = (data: Field[]) => normalize(data, [fieldSchema]);

export const getFieldsFx = createEffect(() => {
  return Promise.resolve(mockFields);
});

const fieldsInitialState: Record<number, Field> = {};
export const $fields = createStore(fieldsInitialState).on(
  getFieldsFx.doneData,
  (_, payload) => {
    return normalizeFields(payload).entities.fields;
  }
);

export const formApi = createApi($fields, {
  changeVariable(state, payload: { variable: string; id: number }) {
    return { ...state, [payload.id]: { ...state[payload.id], variable: payload.variable } };
  },
  changeValue(state, payload: { value: string; id: number }) {
    return { ...state, [payload.id]: { ...state[payload.id], value: payload.value } };
  },
});

export const $fieldsList = combine($fields, (fields) => Object.values(fields));

type UseFormFieldReturn = [
  string,
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLInputElement>) => void
];

export function useFormField(fieldId: number): UseFormFieldReturn {
  const variable = useStoreMap({
    store: $fields,
    keys: [fieldId],
    fn: (state) => state[fieldId].variable,
  });

  const value = useStoreMap({
    store: $fields,
    keys: [fieldId],
    fn: (state) => state[fieldId].value,
  });

  const onChangeVariable = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formApi.changeVariable({ variable: e.currentTarget.value, id: fieldId });
    },
    [fieldId]
  );

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formApi.changeValue({ value: e.currentTarget.value, id: fieldId });
    },
    [fieldId]
  );

  return [variable, value, onChangeVariable, onChangeValue];
}
*/
