import Navbar from "@/components/common/Navbar";
import LoginModal from "@/components/common/LoginModal";
import Init from "@/components/common/Init";

export default function CMSLayout({ children }) {
  return (
    <>
      <Init />
      <Navbar isCMS={true} />
      {children}
      <LoginModal />
    </>
  );
}
