import { useWork, useSelectWork } from "./selectWorkProvider";

export const useCurrentWork = () => {
  const { work, batch, provider } = useWork();
  //const { data } = useAlgoContext();
  /*   console.log(user); */
  return {
    work: work,
    batch: batch,
    provider: provider,
  };
};

export const useSelectMethod = () => {
  const { selectedWork, getServices, getProvider } = useSelectWork();

  return {
    selectedWork,
    getServices,
    getProvider,
  };
};
