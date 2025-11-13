export default function TopListLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Trophy animation */}
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#b8f400] to-[#8fc400] rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-black rounded-full"></div>
            <div className="absolute inset-8 bg-[#b8f400] rounded-full animate-ping"></div>
            <div className="absolute inset-0 flex items-center justify-center text-6xl">🏆</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading Rankings</h2>
        <p className="text-gray-400">Calculating top casinos...</p>
      </div>
    </div>
  )
}
