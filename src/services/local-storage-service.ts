import { Todo } from "../types";

export const setItem = (key: string, value: Todo[]) => {
  const valueString = JSON.stringify(value);
  localStorage.setItem(key, valueString);
}

export const getItem = <T>(key: string): T | undefined => {
  const valueString = localStorage.getItem(key);

  if (!valueString) {
    return
  }

  return JSON.parse(valueString);
}