import Meta from "@/components/Meta";
import Service from "@/components/Service";
import Back from "@/components/Back";
import NavBottom from "@/components/NavBottom";

const Pay = () => {
  return (
    <>
      <Meta title="Pay" desc="Pay for your favourite services online easily!" />
      <div className="h-[90vh] w-screen flex flex-col items-center mb-20">
        <div className="w-[95%] lg:w-4/6 bg-white py-10 px-5 lg:px-8">
          <Back url="/dashboard" />
          <h1 className="text-4xl py-2 font-medium text-left">Pay</h1>
          <p className="mt-3 text-xs text-slate-500 grotesk">Pay for a service online easily and fast with your DeanPay balance with just few clicks ⚡️</p>
          <div className="max-h-[70vh] overflow-y-auto">
            <h2 className="text-sm mt-9 text-center text-slate-600 bg-slate-200 py-2">
              Airtime
            </h2>
            <div className="flex flex-row justify-evenly my-10">
              <Service
                link="/img/mtn.png"
                item="mtn"
                code="MTN"
                type="airtime"
              />
              <Service
                link="/img/glo.png"
                item="glo"
                code="GLO"
                type="airtime"
              />
              <Service
                link="/img/airtel.png"
                item="airtel"
                code="AIRTEL"
                type="airtime"
              />
              <Service
                link="/img/9mobile.png"
                item="9mobile"
                code="9MOBILE"
                type="airtime"
              />
            </div>

            <h2 className="text-sm mt-9 text-center text-slate-600 bg-slate-200 py-2">
              Mobile Data
            </h2>
            <div className="flex flex-row justify-evenly my-10">
              <Service
                link="/img/mtn.png"
                item="mtn"
                code="MTN"
                type="mobile-data"
              />
              <Service
                link="/img/glo.png"
                item="glo"
                code="GLO"
                type="mobile-data"
              />
              <Service
                link="/img/airtel.png"
                item="airtel"
                code="AIRTEL"
                type="mobile-data"
              />
              <Service
                link="/img/9mobile.png"
                item="9mobile"
                code="9MOBILE"
                type="mobile-data"
              />
            </div>
            {/* <h2 className="text-sm mt-9 text-center text-slate-600 bg-slate-200 py-2">
              Cable TV
            </h2>
            <div className="flex flex-row justify-evenly my-10">
              <Service
                link="/img/dstv.png"
                item="dstv"
                code="DSTV"
                type="tv"
              />
              <Service
                link="/img/gotv.png"
                item="gotv"
                code="GOTV"
                type="tv"
              />
              <Service
                link="/img/startimes.png"
                item="startimes"
                code="STARTIMES"
                type="tv"
              />
            </div> */}
          </div>
        </div>
      </div>
      <NavBottom />
    </>
  );
};

export default Pay;
