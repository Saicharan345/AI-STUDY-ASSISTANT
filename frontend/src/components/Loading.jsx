function Loading() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent"></div>

      <p className="mt-4 text-lg font-medium text-gray-700">
        Generating study material...
      </p>
    </div>
  );
}

export default Loading;