import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen(!open);

  return {
    open,
    handleModal: toggle,
  };
};

export default useModal;
