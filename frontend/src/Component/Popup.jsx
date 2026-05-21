import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Popup = ({ type = "success", message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const t = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onClose?.(), 250);
        }, duration);
        return () => clearTimeout(t);
    }, [message]);

    if (!message) return null;

    return (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-250
      ${type === "success"
                ? "bg-green-500/20 border border-green-500/40 text-green-400"
                : "bg-red-500/20 border border-red-500/40 text-red-400"}
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
            {type === "success"
                ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
                : <XCircle className="w-5 h-5 flex-shrink-0" />
            }
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
};

export default Popup;