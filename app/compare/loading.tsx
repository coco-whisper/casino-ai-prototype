export default function CompareLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="flex gap-6 mb-8 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-20 h-28 bg-gradient-to-br from-[#b8f400]/20 to-transparent border-2 border-[#b8f400] rounded-lg animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="w-full h-full flex items-center justify-center text-[#b8f400] text-3xl font-bold">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading Comparison</h2>
        <p className="text-gray-400">Preparing casino data...</p>
      </div>
    </div>
  )
}
