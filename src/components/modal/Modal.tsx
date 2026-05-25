import { FC, ReactNode } from "react";
import PropTypes from "prop-types";

import {
  ModalFooter as StyledModalFooter,
  ModalHeader as StyledModalHeader,
  ModalHeaderBody as StyledModalHeaderBody,
  ModalHeaderHeading as StyledModalHeaderHeading,
  ModalOverlay as StyledModalOverlay,
  ModalWrapper as StyledModalWrapper,
} from "./Modal.styles";
import ReactPortal from "../ReactPortal/ReactPortal";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  overlayBackground?: string;
  overlay?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  overlayClassName?: string;
  onClose?: () => void;
  isOpen: boolean;
}

const Modal: FC<ModalProps> & {
  ModalHeader: typeof StyledModalHeader;
  ModalHeaderHeading: typeof StyledModalHeaderHeading;
  ModalHeaderBody: typeof StyledModalHeaderBody;
  ModalFooter: typeof StyledModalFooter;
} = ({
  children,
  overlayBackground = "var(--neutral, #00000099)",
  overlay = true,
  maxWidth = "18rem",
  maxHeight,
  overlayClassName,
  onClose = () => {},
  isOpen,
  ...rest
}) => {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <StyledModalOverlay
        $overlayBackground={overlayBackground}
        $showBackground={overlay}
        onClick={onClose}
        className={overlayClassName}
        data-testid="modal-overlay"
      >
        <StyledModalWrapper
          onClick={(e) => e.stopPropagation()}
          {...rest}
          $maxWidth={maxWidth}
          $maxHeight={maxHeight}
        >
          {children}
        </StyledModalWrapper>
      </StyledModalOverlay>
    </ReactPortal>
  );
};

Modal.ModalHeader = StyledModalHeader;
Modal.ModalHeaderHeading = StyledModalHeaderHeading;
Modal.ModalHeaderBody = StyledModalHeaderBody;
Modal.ModalFooter = StyledModalFooter;

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  overlayBackground: PropTypes.string,
  overlay: PropTypes.bool,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
};
