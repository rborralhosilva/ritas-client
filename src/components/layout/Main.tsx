import { ReactNode } from "react";

export default function Main({
  children,
  footerHeight,
  headerHeight,
}: {
  children: ReactNode;
  footerHeight: number;
  headerHeight: number;
}) {
  // Ensure that refs are passed correctly when rendering Home
  return (
    <main
      className={`container-fluid d-flex flex-column`}
      style={{
        minHeight: `calc(100dvh - ${footerHeight}px)`,
        paddingTop: `${headerHeight}px`,
        height: "100%",
      }}
    >
      {children}
    </main>
  );
}
