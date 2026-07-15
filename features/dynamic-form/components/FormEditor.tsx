"use client";

import { Formio } from "@formio/js";
import { useEffect, useRef, useState } from "react";
import { FormDefinition } from "../types";

type FormIoSchema = Formio.Builder.schema;
type FormIoBuilderOptions = Formio.Builder.options;

const options: FormIoBuilderOptions = {
  language: "ja",
  i18n: {
    ja: {
      "First Name": "名",
    },
  },
  noDefaultSubmitButton: true,
  builder: {
    custom: {
      title: "Custom Components",
    },
    premium: false,
  },
  projectId:
    process.env.NEXT_PUBLIC_FORMIO_PROJECT_ID || "64a7e0f3c1b6d8e5f9a2b1c4", // 適切なプロジェクトIDに置き換えてください
} as const;

const INITIAL_FORM_SCHEMA = {
  display: "form",
  components: [],
} as const satisfies FormIoSchema;

type FormEditorProps = {
  definition: FormDefinition | null;
  loading: boolean;
  error: Error | null;
  onChange: (v: any) => void;
};

export default function FormEditor({
  definition,
  loading,
  error,
  onChange,
}: FormEditorProps) {
  // const schemaRef = useRef<FormDefinition | null>(INITIAL_FORM_SCHEMA);
  const containerRef = useRef<HTMLDivElement>(null);
  // const onChangeRef = useRef((schema: FormDefinition) => {
  //   // schemaRef.current = schema;
  //   onChange(schema);
  // });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let destroyed = false;
    let builderInstance: Formio.Builder | null = null;

    if (isClient) {
      Formio.builder(
        containerRef.current,
        definition ?? INITIAL_FORM_SCHEMA,
        options,
      ).then((builder: Formio.Builder) => {
        if (destroyed) {
          builder.destroy(true);
          return;
        }
        builderInstance = builder;
        builder.on("change", (schema: FormDefinition) => {
          // onChangeRef.current?.(schema);
          onChange(schema);
        });
      });
    }

    return () => {
      destroyed = true;
      if (builderInstance) {
        builderInstance.destroy(true);
      }
    };
  }, [isClient]);

  return <div ref={containerRef} />;
}
