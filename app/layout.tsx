import { FC } from "react";
import "./app.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const RootLayout: FC = ({ children }) => {
  return (
    <>
      <html>
        <head></head>
        <body>
          <ToastContainer />
          <div className="">
            <div className="bg-gray-900 w-full py-5 h-20  top-0 px-10 flex justify-end items-center text-white">
              <Link href="/" className="container cursor-pointer">
                <HomeIcon className="h-12 w-12" />
              </Link>
            </div>
            <div className="min-h-screen">{children}</div>
          </div>
        </body>
      </html>
    </>
  );
};
export default RootLayout;