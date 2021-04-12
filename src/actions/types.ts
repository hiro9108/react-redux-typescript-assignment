import {
  FetchTodosAction,
  ClearTodosAction,
  ClearSpecificTodoAction,
} from "./todos";

export enum ActionTypes {
  fetchTodos,
  clearTodos,
  clearSpecificTodo,
}

export type Action =
  | FetchTodosAction
  | ClearTodosAction
  | ClearSpecificTodoAction;
