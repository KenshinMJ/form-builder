"use client";

import { FormBuilder as FormioFormBuilder } from "@formio/js";
import { FormBuilder, FormSource } from "@formio/react";
import { useRef } from "react";
import { FormDefinition } from "../types";

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
      },
    },
    premium: false,
  },
} as const satisfies FormioFormBuilder["options"];

const INITIAL_FORM_SCHEMA = {
  type: "form",
  display: "form",
  components: [],
} as const satisfies FormSource;

type FormEditorProps = {
  id: string;
  definition: FormDefinition | null;
  onChange: (v: any) => void;
};

export default function FormEditor({
  id,
  definition,
  onChange,
}: FormEditorProps) {
  const formInstance = useRef<FormioFormBuilder>(null);

  const handleFormReady = (instance: FormioFormBuilder) => {
    formInstance.current = instance;
  };

  return (
    <FormBuilder
      initialForm={(definition as FormSource) ?? INITIAL_FORM_SCHEMA}
      options={options}
      onBuilderReady={handleFormReady}
    />
  );
}
