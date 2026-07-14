import "bootstrap/dist/css/bootstrap.min.css";
import "@formio/js/dist/formio.full.min.css";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container">{children}</div>;
}
