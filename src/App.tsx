import type { Component } from "solid-js";
import { format } from "date-fns";
import { Sidebar, TodoList } from "./shared/components/index";
import { todoState } from "./shared/stored/todoStore";

const App: Component = () => {
  console.log("app rendered");

  // states
  const date = new Date();
  const day = format(date, "iiii");
  const month = format(date, "MMM");
  const dayNum = format(date, "dd");
  const periodFN = () => {
    const tempPeriod = format(date, "a");
    if (tempPeriod === "PM") {
      return "afternoon";
    } else {
      return "morning";
    }
  };
  const period = periodFN();

  return (
    <>
      <main class="relative flex h-screen w-screen gap-7 bg-[#EAEDEE] p-10">
        <Sidebar />

        <section class="flex h-[90vh] w-full flex-col items-center gap-7 lg:w-[66%]">
          <div class="flex w-full flex-col gap-4 md:w-[100%]">
            <div class="flex justify-start w-full mt-9">
              <div class="flex gap-5">
                <div class="w-full">
                  <h1 class="w-full text-xl font-normal leading-none text-black md:text-2xl lg:text-3xl">
                    Good {period} {todoState.name}
                  </h1>
                  <p class="text-base	font-normal leading-6 text-[#6D6D6D] md:text-base lg:text-2xl">
                    It&apos;s {day}, {month} {dayNum}
                  </p>
                </div>
              </div>
            </div>
            <TodoList />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
