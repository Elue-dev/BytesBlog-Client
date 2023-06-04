export default function PostContent({ content }: { content: string }) {
  console.log(content);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
