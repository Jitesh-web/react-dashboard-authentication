import Page1 from "../Dashboard/Page1";
import Page2 from "../Dashboard/Page2";
import Page3 from "../Dashboard/Page3";
import Page4 from "../Dashboard/Page4";
import Page5 from "../Dashboard/Page5";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-[106px_345px_106px] gap-6 w-[960px] p-6">
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
    </div>
  );
};

export default Dashboard;
