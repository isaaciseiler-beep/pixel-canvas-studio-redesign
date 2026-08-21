import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToPageSection } from "@/lib/scroll";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ChatOrb = () => {
  const [visible, setVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const disabled = location.pathname === "/photos" || location.pathname === "/photos/map";

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSidebarState = (event: Event) => {
      setSidebarOpen(Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
    };
    window.addEventListener("site-sidebar-state", handleSidebarState);
    return () => window.removeEventListener("site-sidebar-state", handleSidebarState);
  }, []);

  const handleClick = () => {
    if (location.pathname === "/") {
      scrollToPageSection("isaac-ai");
      return;
    }
    navigate("/#isaac-ai");
  };

  return (
    <AnimatePresence>
      {!disabled && (visible || sidebarOpen) ? (
        <motion.button
          type="button"
          onClick={handleClick}
          className="isaac-ai-pill fixed bottom-5 left-1/2 z-[58] flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[11px] font-medium text-black"
          style={{ x: "-50%" }}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.32, ease: EASE }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Open Isaac AI"
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          <span>Ask Isaac AI</span>
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default ChatOrb;
