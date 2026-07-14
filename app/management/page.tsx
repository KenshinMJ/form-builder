"use client";

import { Formio } from "@formio/js";
import { useEffect, useRef } from "react";

const INITIAL_FORM_SCHEMA = {
  display: "form",
  components: [],
};

export default function FormManagementPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formSchema /*: FormProps*/ = {
      display: "form",
      components: [
        {
          type: "textfield",
          key: "firstName",
          label: "First Name",
          input: true,
        },
        {
          type: "button",
          action: "submit",
          label: "Submit",
          theme: "primary",
          key: "submit",
        },
      ],
    } as const;

    Formio.builder(containerRef.current, formSchema ?? INITIAL_FORM_SCHEMA, {
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
    }).then((builder: Formio.Builder) => {
      // if (destoryed) {
      //   builder.destroy(true);
      //   return;
      // }
      // builderInstance = builder;
      // builder.on("change", (event) => {
      //   onChangeRef.current?.(event);
      // });
    });
  }, []);

  return <main ref={containerRef} />;
}
