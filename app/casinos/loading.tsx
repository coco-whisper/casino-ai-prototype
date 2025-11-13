export default function CasinosLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="flex gap-3 mb-8 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full border-4 border-[#b8f400] animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#b8f400] to-[#8fc400] opacity-50"></div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading Casinos</h2>
        <p className="text-gray-400">Fetching casino list...</p>
      </div>
    </div>
  )
}
