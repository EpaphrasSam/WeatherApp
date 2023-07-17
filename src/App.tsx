import Forecast from "./components/Forecast";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error";

const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      ),
      errorElement: <Error />,
    },
    {
      path: "/forecast",
      element: <Forecast data={forecast} />,
      errorElement: <Error />,
    },
  ]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-screen w-full">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
