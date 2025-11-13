export default function CompareLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Spinning poker chip */}
          <div className="absolute inset-0 border-8 border-[#b8f400] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-3 border-4 border-white/20 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Loading Casino AI
        </h2>
        <p className="text-gray-400">Please wait...</p>
      </div>
    </div>
  );
}
