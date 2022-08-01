export default function Youtube({ id }: { id: string }) {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture; clipboard-write"
        title="Embedded YouTube video"
      />
    </div>
  );
}
