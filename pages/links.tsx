import { useEffect } from "react";
import Nav from "../src/components/Nav/Nav";
import { MountedContext, useMountedContext } from "../src/MountedContext";

export default function Links() {
  const { mounted, setMounted } = useMountedContext();

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Nav mounted={mounted} />
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div className="pt-8 pb-8 mt-8 mb-8">
          <h1 className="font-bold text-5xl text-center pb-1">Links</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            <strong>Contact me!</strong>
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="my-4 py-4">
              <a
                style={{ borderRadius: "16px" }}
                className="flex flex-col justify-content items-center my-6 py-4 px-20 border-2 dark:border-gray-700 border-gray-200 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.github.com/Aayaan-Sahu/"
              >
                GITHUB
              </a>
              <a
                style={{ borderRadius: "16px" }}
                className="flex flex-col justify-content items-center my-6 py-4 px-20 border-2 dark:border-gray-700 border-gray-200 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                rel="noopener noreferrer"
                target="_blank"
                href="mailto:aayaansahu@gmail.com"
              >
                MAIL
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
