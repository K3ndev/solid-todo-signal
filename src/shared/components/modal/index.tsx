import { createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { addName } from "../../stored/todoStore";
import DonaAvatar from "../../assets/dona_Avatar.svg";

export function Modal(props: any) {
  const [modalCurrent, setModalCurrent] = createSignal(1);
  let inputNameRef:
    | HTMLInputElement
    | ((el: HTMLInputElement) => void)
    | undefined;

  const modalContainer = document.getElementById("render-modal") as HTMLElement;

  const continueHandler = () => {
    if (modalCurrent() < 3) {
      setModalCurrent((prev) => {
        return prev + 1;
      });
    }
  };

  const addNameHandler = () => {
    if (modalCurrent() !== 3) {
      return;
    }

    if (inputNameRef instanceof HTMLInputElement) {
      if (inputNameRef.value !== "") {
        props.setIsOpen(() => {
          false;
        });

        addName(inputNameRef.value);

        inputNameRef.value = "";
      }
    }
  };

  return (
    <Portal mount={modalContainer}>
      <div class="absolute inset-0 modal-background-back z-50">
        <div class="flex justify-center items-center w-full h-full ">
          {/* modal */}
          <div class="w-full h-full md:w-[31.25rem] md:h-[31.25rem] modal-background md:rounded-2xl shadow-2xl p-10">
            <div class="h-2/4 flex justify-center items-center">
              <img
                src={DonaAvatar}
                alt="logo"
                class="rounded-2xl bg-white p-4 shadow-2xl"
              />
            </div>
            <div class="h-2/4 flex items-center">
              <div>
                {modalCurrent() === 1 && (
                  <>
                    <h2 class="mb-2 text-xl font-medium ">
                      Welcome to React Todo
                    </h2>
                    <p class="mb-7 text-gray-500 text-sm w-3/5">
                      React Todo is a back to-do list focused on fast and
                      delightful user experience.
                    </p>
                  </>
                )}
                {modalCurrent() === 2 && (
                  <>
                    <h2 class="mb-2 text-xl font-medium ">Powerful lists</h2>
                    <p class="mb-7 text-gray-500 text-sm w-3/5">
                      Organize your tasks into fully customizable lists.
                    </p>
                  </>
                )}
                {modalCurrent() === 3 && (
                  <>
                    <h2 class="mb-2 text-xl font-medium ">What's your name?</h2>
                    <div class="mb-7">
                      <input
                        type="text"
                        placeholder="Type it here..."
                        ref={inputNameRef}
                      />
                    </div>
                  </>
                )}

                {modalCurrent() !== 3 && (
                  <button
                    class="bg-[#008FFD] rounded-lg text-white py-3 px-6 md:py-2 md:px-5 text-sm mb-7 hover:shadow-lg hover:bg-[#007cdb]"
                    onClick={() => {
                      continueHandler();
                    }}
                  >
                    Continue
                  </button>
                )}

                {modalCurrent() === 3 && (
                  <div class="flex gap-2">
                    <button
                      class="bg-[#008FFD] rounded-lg text-white py-3 px-6 md:py-2 md:px-5 text-sm mb-7 hover:shadow-lg hover:bg-[#007cdb]"
                      onClick={() => {
                        addNameHandler();
                      }}
                    >
                      Continue
                    </button>
                    <button
                      class="bg-white rounded-lg text-[#008FFD] py-3 px-6 md:py-2 md:px-5 text-sm mb-7 shadow-lg border flex items-center"
                      onClick={() => {
                        console.log("not available yet");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        class="inline w-4 mr-1"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path d="M16 20h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3v16zM5 20h3V4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1zM16 4l-4 4l-4-4" />
                          <path d="m4 6.5l8 7.5l8-7.5" />
                        </g>
                      </svg>
                      Gmail
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div class="flex justify-center">
              <svg viewBox="0 0 70 10" width="70">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  fill={modalCurrent() === 1 ? "#008FFD" : "#d9d9d9"}
                ></circle>
                <circle
                  cx="25"
                  cy="5"
                  r="5"
                  fill={modalCurrent() === 2 ? "#008FFD" : "#d9d9d9"}
                ></circle>
                <circle
                  cx="45"
                  cy="5"
                  r="5"
                  fill={modalCurrent() === 3 ? "#008FFD" : "#d9d9d9"}
                ></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
