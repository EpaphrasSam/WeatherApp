import Feels from "./Icons/Feels";
import Humidity from "./Icons/Humidity";
import Pop from "./Icons/Pop";
import Pressure from "./Icons/Pressure";
import Visibility from "./Icons/Visibility";
import Wind from "./Icons/Wind";

type Props = {
  icon: "wind" | "feels" | "humidity" | "visibility" | "pressure" | "pop";
  title: string;
  info: string | JSX.Element;
  description: string;
};

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
};

const Tiles = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <div className="w-[140px] h-[130px] text-left text-zinc-700 bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-3 flex flex-col justify-between">
      <div className="flex items-center text-sm font-bold">
        <Icon /> <h4 className="ml-1">{title}</h4>
      </div>
      <div className="flex items-center text-sm font-bold">
        <h3 className="mt-2 text-lg">{info}</h3>
      </div>
      <div className="flex items-center text-sm font-bold">
        <p className="text-xs font-bold">{description}</p>
      </div>
    </div>
  );
};

export default Tiles;
