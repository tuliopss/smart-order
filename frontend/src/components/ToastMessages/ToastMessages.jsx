import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToastMessage from "../../hooks/useToastMessage";

export default function ToastMessages() {
  return (
    <>
      <ToastContainer />
    </>
  );
}
