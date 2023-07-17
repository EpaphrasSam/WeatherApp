import { ChangeEvent, useEffect } from "react";
import { optionType } from "../types";

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <div className="w-[90vw] md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from the dropdown
        </p>
        <div className="flex mt-10 md:mt-4">
          <div className="flex flex-col">
            <input
              type="text"
              value={term}
              className="px-2 py-1 rounded-l-md h-[36px] border-2 border-white"
              onChange={onInputChange}
            />
            <div className="bg-white mt-0 rounded-b-md rounded-l-md">
              {options.map((option: optionType, index: number) => (
                <div key={option.name + "-" + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            className="rounded-r-md border-2 h-[36px] border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
