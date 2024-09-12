import { useTonConnectUI } from "@tonconnect/ui-react";

export function useTonConnect() {
  const [tonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body
                ? args.body.toBoc().toString("base64")
                : undefined,
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}
