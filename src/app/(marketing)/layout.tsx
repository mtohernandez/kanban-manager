import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-full bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
