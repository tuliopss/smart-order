import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useToastMessage() {
  const notify = (type, text) => {
    toast[type](text, {
      position: "top-right",
    });
  };

  return { notify };
}
