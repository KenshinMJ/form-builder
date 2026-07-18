"use client";

import React, { useEffect, useRef } from "react";
import { Formio } from "formiojs";
import "formiojs/dist/formio.full.css"; // Form.ioのスタイルをインポート
import { FormDefinition } from "@/features/dynamic-form/types";

interface FormioFormProps {
  formDefinition: FormDefinition;
  onSubmit: (content: any) => void;
}

const formOption = {} as const;

export default function ApplicationFormRenderer({
  formDefinition,
  onSubmit,
}: FormioFormProps) {
  const formElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formElementRef.current) {
      Formio.createForm(
        formElementRef.current,
        formDefinition,
        formOption,
      ).then((form) => {
        // フォームが送信されたときの処理
        form.on("submit", (submission: any) => {
          console.log("Submission was successful!", submission);
          onSubmit(submission);
        });
      });
    }
  }, [formDefinition]);

  return <div ref={formElementRef}></div>;
}
