import { emitNetPromise } from "./emitNetPromise";

type NuiCBFn = (...any: any[]) => void;

RegisterCommand(
  "openUI",
  () => {
    const msg = JSON.stringify({
      method: "setVisible",
      data: true,
    });
    SendNuiMessage(msg);
    SetNuiFocus(true, true);
  },
  false
);

RegisterCommand(
  "closeUI",
  () => {
    const msg = JSON.stringify({
      method: "setVisible",
      data: false,
    });
    SendNuiMessage(msg);
    SetNuiFocus(false, false);
  },
  false
);

RegisterNuiCallbackType("closeUI");
on("__cfx_nui:closeUI", (data: any, cb: NuiCBFn) => {
  SetNuiFocus(false, false);
  cb({});
});

RegisterNuiCallbackType("getData");
on("__cfx_nui:getData", async (data: any, cb: NuiCBFn) => {
  console.log("Received request on client for getData");

  const returnData = await emitNetPromise("getServerData");
  cb(returnData);
});
