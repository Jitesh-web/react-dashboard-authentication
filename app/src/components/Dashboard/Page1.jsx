import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import BtcLabel from "/images/Label.png";
import InrLabel from "/images/InrLabel.png";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";

const Page1 = () => {
  return (
    <div className="col-span-2 bg-white rounded-2xl">
      <div className="flex justify-around items-center h-[106px]">
        <div className="flex flex-col gap-1">
          <h5 className="text-darkgray text-sm font-medium flex items-center">
            Total Portfolio Value
            <span className="inline-block pl-1">
              <FaInfoCircle />
            </span>
          </h5>
          <h2 className="text-xl font-medium flex items-center">
            <span className="inline-block">
              <MdOutlineCurrencyRupee />
            </span>
            112,312.24
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-darkgray text-sm font-medium">Wallet Balances</h5>
          <h2 className="text-xl font-medium  flex items-center">
            22.39401000
            <span className="inline-block ">
              <img src={BtcLabel} alt="btc label" />
            </span>
          </h2>
        </div>
        <div className="h-[52px] self-end">
          <h2 className="text-xl font-medium flex items-center">
            <span className="inline-block">
              <MdOutlineCurrencyRupee />
            </span>
            1,300.00
            <span className="inline-block">
              <img src={InrLabel} alt="InrLabel" />
            </span>
          </h2>
        </div>
        <div>
          <button className="px-4 py-2.5 m-2 rounded-lg text-sm font-medium bg-purple text-white">
            <span className="inline-block">
              <IoIosArrowRoundUp />
            </span>
            Deposit
          </button>
          <button className="px-4 py-2.5 m-2 rounded-lg text-sm font-medium bg-purple text-white">
            <span className="inline-block">
              <IoIosArrowRoundDown />
            </span>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page1;
