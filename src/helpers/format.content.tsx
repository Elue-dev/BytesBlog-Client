export default function PostContent({ content }: { content: string }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
