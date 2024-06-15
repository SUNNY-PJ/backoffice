import Card from "@/app/components/card/card";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const Recent = () => {
  return (
    <>
      <div className="text-black p-4">log</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Errors"
          count={5}
          icon={<FaExclamationTriangle size={24} />}
          color="bg-red-500"
        />
        <Card
          title="Success"
          count={120}
          icon={<FaCheckCircle size={24} />}
          color="bg-green-500"
        />
      </div>
    </>
  );
};

export default Recent;
