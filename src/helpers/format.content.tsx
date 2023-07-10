export default function PostContent({ content }: { content: string }) {
  return (
    <div className="text-break break-words">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ wordWrap: "break-word" }}
      />
    </div>
  );
}
