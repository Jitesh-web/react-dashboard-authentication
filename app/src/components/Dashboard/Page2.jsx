import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import Graph from "/images/Graph.png";
import Time from "/images/Times.png";

const Page2 = () => {
  return (
    <div className="row-start-2 bg-white rounded-2xl">
      <div className="p-2 flex gap-24">
        <div>
          <h5 className="text-grey text-sm font-medium">Current Price</h5>
          <h1 className="flex items-center text-2xl font-medium">
            <span className="inline-block ">
              <MdOutlineCurrencyRupee />
            </span>
            26,270.25
            <span className="text-green text-sm font-medium pl-2">
              <MdArrowOutward className="inline-block" />
              <span>0.04%</span>
            </span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="py-2.5 px-4 bg-purple rounded-xl text-white">
            Buy
          </button>
          <button className="py-2.5 px-4 bg-purple rounded-xl text-white">
            Sell
          </button>
        </div>
      </div>
      <div className="rounded-xl m-4">
        <div className="flex justify-end items-center h-[27px]">
          <h5 className="bg-gray p-2">1H</h5>
          <h5 className="bg-gray p-2">1D</h5>
          <h5 className="bg-gray p-2">1W</h5>
          <h5 className="bg-gray p-2">1M</h5>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <div className="mt-10">
          <img src={Graph} />
          <img src={Time} />
        </div>
      </div>
    </div>
  );
};

export default Page2;
