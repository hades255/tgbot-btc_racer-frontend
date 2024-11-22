import React from "react";

const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center px-8">
      <div className="flex flex-col gap-4">
        <div>
          <img
            src="flyingrocket_.gif"
            alt=""
            className={`flex justify-center top-0 w-full max-w-[400px]`}
            style={{ mixBlendMode: "color-dodge" }}
          />
        </div>
        <div className="bg-emphasize-new bg-clip-text text-transparent text-2xl text-wrap break-words">
          <b>ANOM INVADOR</b> is in maintenance
        </div>
        <div className="flex justify-center text-[#79DEFE]">
          Contact to
          <a className="ml-2 text-[#1ffff4]" href="https://t.me/z_sm_0001">
            @z_sm_0001
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
