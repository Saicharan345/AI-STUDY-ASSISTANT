function Error({ message }) {
  return (
    <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl">
      <h3 className="text-lg font-bold">
        ❌ Error
      </h3>

      <p className="mt-2">
        {message}
      </p>
    </div>
  );
}

export default Error;