const PageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse space-y-8">
      {/* Breadcrumb Skeleton */}
      <div className="h-28 bg-gray-200 rounded-xl w-full" />

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-gray-200 rounded-xl w-full" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mt-6" />
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
