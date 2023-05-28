import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";
import { Editor } from "primereact/editor";
import { MultiSelect } from "primereact/multiselect";
import "./editor.css";

export default function RichEditor() {
  const [text, setText] = useState<string>("");
  const [categories, setCategories] = useState([]);

  const click = () => {
    const names: any = [];
    categories.map((cat: any) => names.push(cat.name));
    alert(names);
  };

  const interests = [
    { name: "Technology" },
    { name: "Health" },
    { name: "Artificial Intelligence" },
    { name: "Entrepreneurship" },
    { name: "Product Management" },
  ];

  return (
    <div className="card container pt-8">
      <Editor
        value={text}
        onTextChange={(e) => setText(e.htmlValue!)}
        style={{ height: "320px" }}
      />
      <MultiSelect
        value={categories}
        onChange={(e) => setCategories(e.value)}
        options={interests}
        optionLabel="name"
        placeholder="Select Categories"
        maxSelectedLabels={3}
        selectAll={false}
        selectionLimit={2}
        className="custom-multiselect md:w-20rem mt-5 w-full"
      />
      <button
        className="mt-4 h-10 w-20 rounded bg-primaryColor font-semibold text-white"
        onClick={click}
      >
        Okay
      </button>
    </div>
  );
}
