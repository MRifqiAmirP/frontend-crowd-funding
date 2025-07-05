import * as RHT from "react-hot-toast";

interface ToastOptions {
  title?: string;
  description: string;
  type?: "success" | "error" | "info";
}

const toast = ({ title, description, type = "success" }: ToastOptions) => {
  const message = title ? `${title}\n${description}` : description;

  switch (type) {
    case "success":
      RHT.toast.success(message, {
        duration: 5000, // Durasi toast 5 detik
        position: "bottom-right", // Posisi toast
      });
      break;
    case "error":
      RHT.toast.error(message, {
        duration: 5000, // Durasi toast 5 detik
        position: "bottom-right", // Posisi toast
      });
      break;
    case "info":
      RHT.toast(message, {
        duration: 5000, // Durasi toast 5 detik
        position: "bottom-right", // Posisi toast
      });
      break;
    default:
      RHT.toast(message, {
        duration: 5000, // Durasi toast 5 detik
        position: "bottom-right", // Posisi toast
      });
  }
};

export { toast };
