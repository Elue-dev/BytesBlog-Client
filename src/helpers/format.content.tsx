export default function PostContent({ content }: { content: string }) {
  return (
    <div className="text-break">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
