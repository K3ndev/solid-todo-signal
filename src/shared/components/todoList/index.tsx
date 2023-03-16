import type { Component } from "solid-js";
import {
  todoState,
  removeList,
  changeIsChecked,
  addList,
} from "../../stored/todoStore";
import { AiOutlineCheck, AiOutlineDelete } from "solid-icons/ai";
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

export const TodoList = () => {
  // ref
  let inputTodoRef:
    | HTMLInputElement
    | ((el: HTMLInputElement) => void)
    | undefined;
  // return an index, data that iss reverse, and length
  const currentIndex = () => {
    return todoState.categoryList
      .map((item: categoryType) => item.isUsed)
      .indexOf(true);
  };

  // using structuredClone cause an error
  // Uncaught DOMException: Proxy object could not be cloned.
  const currentDataReverse = () => {
    return todoState.categoryList[currentIndex()].todoList
      .map((obj) => JSON.parse(JSON.stringify(obj)))
      .reverse();
  };

  const currentDataLength = () => {
    return todoState.categoryList.filter((item: categoryType) => item.isUsed);
  };

  // removing a list
  function removeTodoList(argTodoList: todoListType) {
    removeList(argTodoList);
  }

  // changing the isChecked to true or false
  function changeChecked(argList: todoListType) {
    changeIsChecked(argList);
  }

  // get uniqueID
  const getUniqueId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  };

  function onSubmitHandler(event: any, argInput: any) {
    event.preventDefault();

    if (argInput === "") {
      return;
    }
    const checkerList = (): boolean => {
      return currentDataReverse().some((item: todoListType) => {
        return item.list === argInput;
      });
    };

    if (!checkerList()) {
      addList({ id: getUniqueId(), isChecked: false, list: argInput });
    }

    if (inputTodoRef instanceof HTMLInputElement) {
      inputTodoRef.value = "";
    }
  }

  return (
    <div class="flex flex-col items-center justify-center w-full gap-4">
      <form
        action="#"
        onSubmit={(event) => {
          if (inputTodoRef instanceof HTMLInputElement) {
            onSubmitHandler(event, inputTodoRef.value);
          }
        }}
        class="w-full"
      >
        <label for="todoList">
          <div class="w-full">
            <input
              disabled={!currentDataLength().length}
              autocomplete="off"
              // {...register("todoList")}
              placeholder="Write a new task..."
              class="h-11 w-full rounded-2xl bg-[#D9D9D9] px-6 py-4 text-xs font-normal outline-0 placeholder:text-xs placeholder:font-normal focus:bg-white md:text-sm placeholder:md:text-sm lg:h-16 lg:text-base placeholder:lg:text-base"
              ref={inputTodoRef}
            />
          </div>
        </label>
      </form>
      {/* list */}
      <div class="scrollbar-hide flex h-[68vh] w-full flex-col gap-3 overflow-auto">
        {/*  */}
        {currentDataLength().length === 1 &&
          currentDataReverse().map((item: todoListType) => {
            return (
              <div class="flex items-center min-w-full px-6 py-4 bg-white rounded-2xl">
                <div class="flex items-center w-full h-auto gap-4">
                  {!item.isChecked ? (
                    <div
                      onClick={() => {
                        changeChecked(item);
                      }}
                      class="h-[1.25rem] w-[1.25rem] cursor-pointer rounded-lg bg-[#D9D9D9] md:h-[1.813rem] md:w-[1.813rem] md:rounded-[0.625rem]"
                    />
                  ) : (
                    <div
                      onClick={() => {
                        changeChecked(item);
                      }}
                      class="flex h-[1.25rem] w-[1.25rem] cursor-pointer items-center justify-center rounded-lg bg-black md:h-[1.813rem] md:w-[1.813rem] md:rounded-[0.625rem]"
                    >
                      <AiOutlineCheck class="fill-white scale-75 md:scale-100" />
                      {/* <p class="text-white">T</p> */}
                    </div>
                  )}
                  <p
                    class={`${
                      item.isChecked && "line-through decoration-2"
                    } w-full break-all text-xs font-normal md:text-sm lg:text-base`}
                  >
                    {item.list}
                  </p>
                </div>
                <button
                  onClick={() => {
                    removeTodoList(item);
                  }}
                  class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-[#EB4747]"
                >
                  <AiOutlineDelete class="text-center" />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
