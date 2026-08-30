import OverlayModal from "@/Components/Partials/OverlayModal";
import { createContext, useContext, useEffect, useState } from "react";

export const ModalContext = createContext();

const Modal = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [modal, setModal] = useState(false);

    return (
        <ModalContext.Provider
            value={{ modalContent, setModalContent, modal, setModal }}
        >
            {children}
        </ModalContext.Provider>
    );
};

const ModalContent = () => {
    const { setModal, modalContent } = useContext(ModalContext);

    return (
        <Modal>
            <OverlayModal clickFunc={() => setModal(false)}>
                {modalContent}
            </OverlayModal>
        </Modal>
    );
};

Modal.Content = ModalContent;

export default Modal;
