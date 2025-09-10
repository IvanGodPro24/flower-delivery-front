import Header from "../Header/Header";
import { LayoutProps } from "./Layout.types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
