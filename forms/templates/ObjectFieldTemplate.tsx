import type { ObjectFieldTemplateProps } from "@rjsf/utils";

export function ObjectFieldTemplate({
  properties,
  title,
}: ObjectFieldTemplateProps) {
  return (
    <div>
      {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
      {properties.map((prop) => (
        <div key={prop.name}>{prop.content}</div>
      ))}
    </div>
  );
}
