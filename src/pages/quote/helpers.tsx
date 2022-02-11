import { FunctionComponent, createContext, useState } from "react";
import { InfoModal } from "../../components/form";
import { ContentSelector } from "../../components/rotating-page";

import mountFloat from "../../images/mount-float.jpg";
import mountEdge from "../../images/mount-edge.jpg";
import mountWindow from "../../images/mount-window.jpg";

export const HelpersContext = createContext<{
  closeHelper: (modal: string) => void;
  openHelper: (modal: string) => void;
  helperState: { [key: string]: boolean };
}>({
  closeHelper: (): void => undefined,
  openHelper: (): void => undefined,
  helperState: {},
});

export const hasHelper: { [key: string]: boolean } = {
  mount: true,
};

const Helpers: FunctionComponent<{
  helperState: { [key: string]: boolean };
  closeHelper: (modal: string) => void;
}> = ({ helperState, closeHelper }) => {
  return (
    <InfoModal isOpen={helperState.mount} close={() => closeHelper("mount")}>
      <ContentSelector section="mounts">
        <div className="info-inner">
          <img src={mountWindow} alt="window mount" />
        </div>
        <div className="info-inner">
          <img src={mountEdge} alt="edge mount" />
        </div>
        <div className="info-inner">
          <img src={mountFloat} alt="float mount" />
        </div>
      </ContentSelector>
    </InfoModal>
  );
};

export const HelpersProvider: FunctionComponent = ({ children }) => {
  const [helperState, setHelperState] = useState({ mount: false });
  const closeHelper = (modal: string) =>
    setHelperState({ ...helperState, [modal]: false });
  const openHelper = (modal: string) =>
    setHelperState({ ...helperState, [modal]: true });
  return (
    <HelpersContext.Provider value={{ closeHelper, openHelper, helperState }}>
      <Helpers helperState={helperState} closeHelper={closeHelper} />
      {children}
    </HelpersContext.Provider>
  );
};
