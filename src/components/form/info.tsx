/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { FC } from "react";
import ReactModal from "react-modal";
import info from "../../images/info.svg";

ReactModal.setAppElement(document.getElementById("root") as HTMLElement);

import "./info.scss";

export const InfoIcon: FC<{
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}> = ({ onClick, children }) => {
  return (
    <span
      className={`lacuna-info-icon${
        children ? " lacuna-info-icon--with-text" : ""
      }`}
      onClick={onClick}
    >
      <img src={info} role="presentation" />
      {children && <span className="children">{children}</span>}
    </span>
  );
};

export const InfoModal: FC<{ isOpen: boolean; close: () => void }> = ({
  isOpen,
  close,
  children,
}) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={close} className="lacuna-modal">
      {children}
    </ReactModal>
  );
};
