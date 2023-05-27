import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { useState } from "react";
import { Editor } from "primereact/editor";

export default function RichEditor() {
  const [text, setText] = useState("");

  return (
    <div className="card container pt-8">
      <Editor
        value={text}
        onTextChange={(e: any) => setText(e.target.value)}
        style={{ height: "320px" }}
      />
    </div>
  );
}
