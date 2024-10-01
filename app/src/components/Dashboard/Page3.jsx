import { FaDollarSign } from "react-icons/fa";
import { SiBitcoinsv } from "react-icons/si";

const Page3 = () => {
  return (
    <div className="row-start-2 bg-white rounded-2xl p-4">
      <div className="flex flex-col gap-3">
        <div className="my-2">
          <h3 className="text-darkgray text-sm font-medium">
            Recent Transactions
          </h3>
          <div className="flex justify-between items-center m-2">
            <div className="bg-gray rounded-[30px] h-10 w-10 flex justify-center items-center">
              <FaDollarSign />
            </div>
            <div className="mr-32">
              <h2 className="text-sm font-medium">INR Deposit</h2>
              <h4 className="text-xs font-normal text-grey">
                2022-06-09 7:06 PM
              </h4>
            </div>
            <h2 className="text-sm font-medium">+ ₹81,123.10</h2>
          </div>
        </div>
        <div className="my-2">
          <div className="flex justify-between items-center m-2">
            <div className="bg-gray rounded-[30px] h-10 w-10 flex justify-center items-center">
              <SiBitcoinsv />
            </div>
            <div className="mr-[102px]">
              <h2 className="text-sm font-medium">BTC Sell</h2>
              <h4 className="text-xs font-normal text-grey">
                2022-05-27 12:32 PM
              </h4>
            </div>
            <div>
              <h2 className="text-sm font-medium">-12.485391 BTC</h2>
              <h4 className="text-xs font-normal text-grey">+ $81,123.10</h4>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="flex justify-between items-center m-2">
            <div className="bg-gray rounded-[30px] h-10 w-10 flex justify-center items-center">
              <FaDollarSign />
            </div>
            <div className="mr-32">
              <h2 className="text-sm font-medium">INR Deposit</h2>
              <h4 className="text-xs font-normal text-grey">
                2022-06-09 7:06 PM
              </h4>
            </div>
            <h2 className="text-sm font-medium">+ ₹81,123.10</h2>
          </div>
        </div>
      </div>
      <div>
        <button className="py-2.5 px-44 bg-gray rounded-xl text-sm font-medium">
          View All
        </button>
      </div>
    </div>
  );
};

export default Page3;
