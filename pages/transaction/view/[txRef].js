import Back from "@/components/Back";
import Meta from "@/components/Meta";
import NavBottom from "@/components/NavBottom";
import PayError from "@/components/PayError";
import axios from "axios";
const numeral = require("numeral");

const Transaction = ({ details }) => {
  return (
    <>
      <Meta title="View Transaction" />
      <div className="w-[90vw] md:w-3/5 mt-1 mx-auto mb-10">
        <Back url="/dashboard" />
      </div>
      {details.status === "error" && (
        <div className="w-full md:w-3/5 mt-20 mx-auto">
          <PayError text={details.message} />
        </div>
      )}

      {details.status !== "error" && (
        <div className="w-[95vw] md:w-3/5 mt-8 px-4 mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-500">
            View Transaction
          </h1>

          <div className="w-full bg-slate-100 rounded-lg mt-5 mb-16 py-4 px-5">
            <div className="text-sm md:text-lg font-medium text-slate-600 space-y-2 my-6">
              <h2 className="w-max px-3 py-1 text-slate-300 text-xs bg-slate-600 rounded-lg">
                DESCRIPTION
              </h2>
              <div>{details.data.transactionType}</div>
            </div>

            <div className="text-sm md:text-lg font-medium text-slate-600 space-y-2 my-6">
              <h2 className="w-max px-3 py-1 text-slate-300 text-xs bg-slate-600 rounded-lg">
                AMOUNT
              </h2>
              <div>
                {"NGN " + numeral(details.data.amount).format("0,0.00")}
              </div>
            </div>

            <div className="text-sm md:text-lg font-medium text-slate-600 space-y-2 my-6">
              <h2 className="w-max px-3 py-1 text-slate-300 text-xs bg-slate-600 rounded-lg">
                TRANSACTION TYPE
              </h2>
              <div>
                {details.data.isInFlow !== true ? "Money Spent" : "Money Received"}
              </div>
            </div>

            <div className="text-sm md:text-lg font-medium text-slate-600 space-y-2 my-6">
              <h2 className="w-max px-3 py-1 text-slate-300 text-xs bg-slate-600 rounded-lg">
                TRANSACTION ID
              </h2>
              <div>{details.data.tx_ref}</div>
            </div>

            <div className="text-sm md:text-lg font-medium text-slate-600 space-y-2 my-6">
              <h2 className="w-max px-3 py-1 text-slate-300 text-xs bg-slate-600 rounded-lg">
                STATUS
              </h2>
              <div>{(details.data.status).toUpperCase()}</div>
            </div>

            <div className="text-sm md:text-lg font-medium text-slate-600 space-y-2 my-6">
              <h2 className="w-max px-3 py-1 text-slate-300 text-xs bg-slate-600 rounded-lg">
                TIMESTAMP
              </h2>
              <div>{(details.data.createdAt).substring(0,10)} {(details.data.createdAt).substring(11,16)}</div>
            </div>
          </div>
        </div>
      )}
      <NavBottom />
    </>
  );
};

export default Transaction;

export async function getServerSideProps({ query: { txRef } }) {
  const findTransaction = await axios({
    method: "POST",
    url: "https://api.deanpay.com/api/transaction/view",
    data: {
      txRef: txRef,
    },
  });

  return {
    props: {
      details: findTransaction.data,
    },
  };
}
