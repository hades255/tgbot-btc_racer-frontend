import { useEffect, useState } from "react";
import { Address } from "@ton/core";
import Counter from "../contracts/counter";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState(null);
  const { sender } = useTonConnect();

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse("EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract);
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(val.toString());
      await sleep(5000); // sleep 5 seconds and poll value again
      getValue();
    }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract ? counterContract.address.toString() : undefined,
    sendIncrement: () => {
      return counterContract
        ? counterContract.sendIncrement(sender)
        : undefined;
    },
  };
}
