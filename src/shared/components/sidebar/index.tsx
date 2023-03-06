import type { Component } from "solid-js";
import {
  todoState,
  addCategory,
  removeCategory,
  changeIsUsed,
} from "../../stored/todoStore";
import DonaAvatar from "../../assets/dona_Avatar.svg";
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
export const Sidebar: Component = () => {
  console.log("sidebar rendered");

  // ref
  let inputRef: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined;

  // fn
  // get uniqueID
  const getUniqueId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  };

  // checker, will return boolean
  const checkerCategory = (argCategoryName: string) => {
    return todoState.categoryList.some((item: categoryType) => {
      return item.categoryName.toLowerCase() === argCategoryName.toLowerCase();
    });
  };
  // onSubmit
  const onSubmitHandler = (event: any, argInput: any) => {
    event.preventDefault();

    if (inputRef instanceof HTMLInputElement) {
      if (inputRef.value === "") {
        return;
      }
    }

    if (!checkerCategory(argInput)) {
      const newCategory = {
        id: getUniqueId(),
        categoryName: argInput,
        isUsed: false,
        todoList: [],
      };
      addCategory(newCategory);
      changeIsUsed(newCategory);
    }
    if (inputRef instanceof HTMLInputElement) {
      inputRef.value = "";
    }
  };

  // to select the target category
  const onClickHandler = (argCategory: categoryType) => {
    changeIsUsed(argCategory);
  };

  // to delete the target category
  const onDeleteClickHandler = (id: number) => {
    removeCategory(id);
  };

  return (
    <aside class="hidden h-[90vh] w-[44%] justify-center rounded-[20px] bg-white p-10 md:w-[34%] lg:inline-flex">
      <div class="scrollbar-hide h-[82vh] w-full">
        <div class="flex flex-col max-w-full gap-4">
          {/* list */}
          {todoState.categoryList.map((item: categoryType) => {
            return (
              <div class="">
                <div
                  class={`${
                    item.isUsed && "bg-[#EAEDEE]"
                  } flex h-auto cursor-pointer items-center justify-between rounded-[20px] py-5 px-6`}
                  onClick={() => onClickHandler(item)}
                >
                  <div class={`flex items-center`}>
                    <img
                      src={DonaAvatar}
                      alt="dona_Avatar"
                      class="max-h-[15px] max-w-[15px]"
                      width="200"
                      height="200"
                    />
                    <p class="px-3 text-base font-normal text-black break-all">
                      {item.categoryName}
                    </p>
                  </div>

                  {item.categoryName === "Home" ? (
                    <div class="">
                      <p class="max-w-11 flex max-h-7 items-center justify-center rounded-lg bg-[#D9D9D9] px-2 py-[0.15rem] text-[#6D6D6D]">
                        {item.todoList.length}
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => onDeleteClickHandler(item.id)}
                      class="max-w-11 item-custom flex max-h-7 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9] px-2 py-[0.15rem] text-[#6D6D6D] hover:bg-[#EB4747]"
                    >
                      <p class="new-label">
                        <span>{item.todoList.length}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {/* input */}
          <div class="flex items-center justify-center w-full h-16 gap-8 px-6 py-4">
            <div class="text-xl">+</div>
            <form
              class="w-full"
              onSubmit={(event) => {
                if (inputRef instanceof HTMLInputElement) {
                  onSubmitHandler(event, inputRef.value);
                }
              }}
            >
              <input
                ref={inputRef}
                type="text"
                autocomplete="off"
                placeholder="Create new category..."
                class="w-full text-sm line-clamp-3 outline-0 placeholder:text-sm placeholder:font-normal"
              />
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
};
