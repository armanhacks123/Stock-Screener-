export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-300 rounded mb-4"></div>

      <div className="space-y-3">
        {Array.from({ length: 8 }).map(
          (_, i) => (
            <div
              key={i}
              className="h-14 bg-gray-200 rounded"
            />
          )
        )}
      </div>
    </div>
  );
}