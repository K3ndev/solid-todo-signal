import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

// types
type todoListType = {
  id: number;
  isChecked: boolean;
  list: string;
};
type categoryType = {
  id: number;
  categoryName: string;
  isUsed: boolean;
  todoList: todoListType[];
};

type todoStateType = {
  name: string;
  categoryList: categoryType[];
};

export const [todoState, setTodoState] = createStore<todoStateType>({
  name: "Human",
  categoryList: [
    {
      id: 1,
      categoryName: "Home",
      isUsed: true,
      todoList: [],
    },
  ],
});

export const addName = (argName: string) => {
  setTodoState({ name: argName, categoryList: todoState.categoryList });
};
export const addCategory = (argCategory: categoryType) => {
  console.log("run");
  setTodoState({
    name: todoState.name,
    categoryList: [...todoState.categoryList, argCategory],
  });
};
export const removeCategory = (argId: number) => {
  setTodoState({
    name: todoState.name,
    categoryList: todoState.categoryList.filter((item: categoryType) => {
      return argId !== item.id;
    }),
  });
};
export const changeIsUsed = (argCategory: categoryType) => {
  setTodoState({
    name: todoState.name,
    categoryList: todoState.categoryList.map((item: categoryType) => {
      if (argCategory.categoryName === item.categoryName) {
        return {
          id: item.id,
          categoryName: item.categoryName,
          isUsed: true,
          todoList: item.todoList,
        };
      }
      return {
        id: item.id,
        categoryName: item.categoryName,
        isUsed: false,
        todoList: item.todoList,
      };
    }),
  });
};
export const addList = (argTodoList: todoListType) => {
  setTodoState({
    name: todoState.name,
    categoryList: todoState.categoryList.map((item: categoryType) => {
      if (item.isUsed) {
        return {
          id: item.id,
          categoryName: item.categoryName,
          isUsed: true,
          todoList: [...item.todoList, argTodoList],
        };
      }
      return item;
    }),
  });
};
export const removeList = (argTodoList: todoListType) => {
  setTodoState({
    name: todoState.name,
    categoryList: todoState.categoryList.map((item: categoryType) => {
      if (item.isUsed === true) {
        return {
          id: item.id,
          categoryName: item.categoryName,
          isUsed: item.isUsed,
          todoList: item.todoList.filter((item: todoListType) => {
            return item.id !== argTodoList.id;
          }),
        };
      }
      return item;
    }),
  });
};
export const changeIsChecked = (argTodoList: todoListType) => {
  setTodoState({
    name: todoState.name,
    categoryList: todoState.categoryList.map((item: categoryType) => {
      if (item.isUsed === true) {
        return {
          id: item.id,
          categoryName: item.categoryName,
          isUsed: item.isUsed,
          todoList: item.todoList.map((item: todoListType) => {
            if (item.id === argTodoList.id) {
              return {
                id: item.id,
                isChecked: !item.isChecked,
                list: item.list,
              };
            } else return item;
          }),
        };
      }
      return item;
    }),
  });
};
