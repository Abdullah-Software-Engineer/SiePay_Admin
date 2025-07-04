import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    index: "01",
    title: "Crypto.com Pay Checkout",
    description: "Receive cryptocurrency as payment on online sales",
    image: "/crypto-card.png",
  },
  {
    id: 2,
    index: "02",
    title: "Invoicing",
    description: "Create and send invoices",
    image: "/invoice-card.png",
  },
  {
    id: 3,
    index: "03",
    title: "Subscription",
    description: "Create and send subscription-based payments",
    image: "/subscription-card.png",
  },
];

const Card = ({ index, img }: { index: string; img: string }) => {
  return (
    <div className="aspect-[1/.9] relative mb-4 md:mb-6 z-10">
      <div className="absolute top-0 left-0 w-[19%] h-[22%] flex items-center justify-center">
        <h1 className="text-2xl 2xl:text-3xl opacity-70 text-black font-semibold">
          {index}
        </h1>
      </div>

      <img
        src="/card-shape.png"
        className="select-none pointer-events-none absolute top-0 left-0 w-full h-full -z-10"
        alt=""
      />

      <img
        src={img}
        className="absolute top-1/2 left-1/2 w-[60%] h-[60%] -translate-x-1/2 -translate-y-1/2 z-10 object-contain"
      />

      <div className="absolute bottom-[0%] right-0 flex items-center justify-center w-[16%] h-[13%]">
        <button className="flex items-center justify-center w-[100%] h-full bg-[#08B882] rounded-xl">
          <ArrowUpRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

const GetStartedPage = () => {
  return (
    <div className="w-full  container-wrapper">
      {/* Get Started Header */}
      <div className="bg-[#001939] text-white rounded-3xl p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Get Started</h2>
            <p className="text-gray-300 mt-1">
              Only a few steps to start receive your first crypto payment.
            </p>
          </div>
          <div className="absolute right-4 top-6">
            <img
              src="/logo.png"
              alt="Get Started"
              className="w-14 h-14"
            />
          </div>
        </div>
      </div>

      {/* Get Verified Section */}
      <div
        style={{
          borderRadius: "20px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
        }}
        className="bg-white rounded-lg p-6 mb-6 border border-gray-100 "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-1 rounded-full mr-4">
              <img
                src="/verify-tick.png"
                alt="Verified"
                className="w-14 h-14"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">Get Verified</h3>
              <p className="text-gray-600 text-sm">
                Get verified to begin using our product and services
              </p>
            </div>
          </div>
          <button className="bg-[#08B882] hover:bg-[#07a474] text-white px-6 py-4 rounded-4xl text-sm flex items-center gap-2">
            <img
              src="/go-to-verificaion.png"
              alt="Verified"
              className="w-6 h-6"
            />
            Go To Verification
          </button>
        </div>
      </div>

      {/* Our Products And Services */}
      <div className="my-8 p-6  relative">
        <div className="absolute  inset-0 w-full z-0 bg-[#001939] rounded-4xl md:bg-transparent">
        <img src="/get-started-bg.png" alt="" className="w-full h-full md:block hidden"/>
        </div>
        <div className="relative  z-10  ">
          <h2 className="text-4xl text-white font-gellix font-semibold m-6">
            Our Products And
            <br /> Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
              >
                <div className="px-4 pt-4">
                  <Card index={product.index} img={product.image} />
                </div>
                <div className="px-4 flex flex-col flex-1">
                  <h3 className="text-2xl font-gellix font-bold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-[#737373] text-base mb-4">
                    {product.description}
                  </p>
                  <div className="mt-auto pb-4">
                    <button className="w-full bg-[#08B882] hover:bg-[#07a474] text-white py-4 rounded-4xl text-base font-gellix">
                      See Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
