import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-muted p-4 md:p-8">
      {children}
    </div>
  );
};

export default Layout;
