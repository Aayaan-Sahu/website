import Nav from "../src/components/Nav/Nav";
import { MountedContext, useMountedContext } from "../src/MountedContext";
import { useEffect } from "react";

export default function Page404() {
  const { mounted, setMounted } = useMountedContext();
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Nav mounted={mounted} />
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-center font-semibold text-5xl">404</h1>
          <p>PAGE NOT FOUND</p>
        </div>
      </div>
    </>
  );
}
