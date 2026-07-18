"use client";

import type { FormSource, FormType } from "@formio/react";
import {
  FormBuilder as FormioFormBuilder,
  Formio,
  Components,
} from "@formio/js";
import { useEffect, useRef } from "react";
import EmpPickerComponent from "@/forms/components/EmpPickerComponent";
import MyCustomComponent from "@/forms/components/MyCustomComponent";
import { FormDefinition } from "../types";

Components.addComponent("myCustomComponent", MyCustomComponent);
Components.addComponent("emppicker", EmpPickerComponent);

const options = {
  language: "ja",
  i18n: {
    ja: {
      searchFields: "項目を検索",

      "Custom Components": "独自項目",

      Basic: "基本項目",
      "Text Field": "テキスト",
      "Text Area": "文章入力",
      Number: "数値",
      Password: "パスワード",
      Checkbox: "チェック",
      "Select Boxes": "複数選択",
      Select: "選択",
      Radio: "ラジオボタン",
      Button: "ボタン",

      Advanced: "高度な項目",
      Email: "メールアドレス",
      "Phone Number": "電話番号",
      Tags: "タグ",
      Address: "住所",
      "Date / Time": "日時",
      Day: "年月日",
      Time: "時刻",
      Currency: "通貨",
      Survey: "アンケート",
      Signiture: "手書きサイン",

      Layout: "レイアウト",
      "HTML Element": "HTML要素",
      Content: "説明",
      Columns: "列",
      "Field Set": "項目グループ",
      Panel: "パネル",
      Table: "表",
      Tabs: "タブ",
      Well: "強調",

      Data: "データ",
      Hidden: "隠し項目",
      Container: "データコンテナ",
      "Data Map": "データマップ",
      "Data Grid": "データグリッド",
      "Edit Grid": "グリッドの編集",

      Label: "ラベル",
      "Label Position": "ラベルの位置",
      Placeholder: "プレースホルダー",
      Description: "説明",
      Tooltip: "ツールチップ",
    },
  },
  noDefaultSubmitButton: true,
  builder: {
    custom: {
      title: "Custom Components",
      components: {
        firstName: {
          title: "First Name",
          key: "firstName",
          icon: "terminal",
          schema: {
            label: "First Name",
            type: "textfield",
            key: "firstName",
            input: true,
          },
        },
        myCustomComponent: true,
        emppicker: true,
      },
    },
    premium: false,
    // projectId: "64a7e0f3c1b6d8e5f9a2b1c4",
  },
} as const satisfies FormioFormBuilder["options"];

export const INITIAL_FORM_SCHEMA = {
  type: "form",
  display: "form",
  components: [],
} as const satisfies FormSource;

type FormEditorProps = {
  id: string;
  definition: FormType | null;
  onChange: (v: FormType) => void;
};

export default function FormEditor({
  id,
  definition,
  onChange,
}: FormEditorProps) {
  // const formInstance = useRef<FormioFormBuilder>(null);

  // const handleFormReady = (instance: FormioFormBuilder) => {
  //   formInstance.current = instance;
  // };

  // return (
  //   <FormBuilder
  //     initialForm={definition ?? INITIAL_FORM_SCHEMA}
  //     options={options}
  //     onBuilderReady={handleFormReady}
  //     onChange={onChange}
  //   />
  // );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let destroyed = false;
    let builderInstance: Formio.Builder | null = null;

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
        onChange(schema);
      });
    });

    return () => {
      destroyed = true;
      if (builderInstance) {
        builderInstance.destroy(true);
      }
    };
  }, [id]);

  return <div ref={containerRef} />;
}
