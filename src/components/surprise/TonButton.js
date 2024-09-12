import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useCounterContract } from "../../hooks/useCounterContract";

const TonButton = () => {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();

  return (
    <>
      <div className="flex justify-center my-4 mx-4">
        <TonConnectButton />
      </div>
      {address && (
        <div className="flex justify-center my-4 mx-4 text-white">
          <div>
            <b>Counter Address</b>
            <div className="Hint">{address?.slice(0, 30) + "..."}</div>
          </div>
        </div>
      )}

      {value && (
        <div className="flex justify-center my-4 mx-4 text-white">
          <div>
            <b>Counter Value</b>
            <div>{value ?? "Loading..."}</div>
          </div>
        </div>
      )}
      {sendIncrement && (
        <button
          className={`Button ${connected ? "Active" : "Disabled"} text-white`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </button>
      )}
    </>
  );
};

export default TonButton;
