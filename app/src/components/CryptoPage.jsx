import { MdDashboard } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import compareArrow from "/images/compare-arrow.png";
import Content from "./Content";
import { Link, Outlet } from "react-router-dom";

const CryptoPage = ({ state, dispatch }) => {
  const { selectedTab } = state;

  return (
    <div className="h-screen grid grid-cols-[256px_1fr]">
      <div className="row-span-2 flex flex-col justify-around">
        <div className="max-w-[232px] h-[146px] mb-auto mt-14">
          <h2 className="flex justify-center items-center text-purple font-medium text-[20px] leading-5 mb-6">
            @DOSOMECODING
          </h2>
          <div className="flex justify-start items-center h-[42px] rounded-xl bg-gray border-[0.5px] border-gray p-2.5">
            <div className="p-3">
              <MdDashboard className="h-3.5 w-3.5" />
            </div>
            <Link to="/">
              <h4
                className="text-[14px] leading-5 text-grey hover:text-black cursor-pointer"
                // onClick={() =>
                //   dispatch({ type: "Dashboard", payload: "Dashboard" })
                // }
              >
                Dashboard
              </h4>
            </Link>
          </div>
          <div className="flex justify-start items-center p-2.5">
            <div className="p-3">
              <img
                src={compareArrow}
                className="h-3.5 w-3.5"
                alt="compare-arrow"
              />
            </div>
            <Link to="/transactions">
              <h4
                className="text-[14px] leading-5 text-grey hover:text-black cursor-pointer"
                // onClick={() =>
                //   dispatch({
                //     type: "Transactions",
                //     payload: "Transactions",
                //   })
                // }
              >
                Transactions
              </h4>
            </Link>
          </div>
        </div>
        <div className="flex justify-start items-center p-2.5">
          <div className="p-3">
            <TfiHeadphoneAlt className="h-3.5 w-3.5" />
          </div>
          <Link to="/support">
            <h4
              className="text-[14px] leading-5 text-grey hover:text-black cursor-pointer"
              // onClick={() =>
              //   dispatch({
              //     type: "Support",
              //     payload: "Support",
              //   })
              // }
            >
              Support
            </h4>
          </Link>
        </div>
      </div>
      <div className="h-[64px] flex justify-between items-center m-[0_8%]">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <div>
          <CgProfile className="h-12 w-12" />
        </div>
      </div>
      <div className="custom-height bg-gray">
        <div className="flex justify-center items-center ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;
