import { ArrowLeft, ChevronDown, Info } from "lucide-react"

// SVG Fox Icon component
const FoxIcon = () => (
  <svg width="48" height="48" viewBox="0 0 200 200" className="rounded-lg">
    <rect width="200" height="200" fill="#1f2937" rx="12" />
    {/* Fox face using geometric shapes */}
    <polygon points="100,60 70,100 130,100" fill="#f97316" />
    <polygon points="70,100 60,120 80,120" fill="#ea580c" />
    <polygon points="130,100 140,120 120,120" fill="#ea580c" />
    <polygon points="80,120 120,120 110,140 90,140" fill="#f97316" />
    <polygon points="90,140 110,140 105,150 95,150" fill="#fbbf24" />
    <rect x="92" y="148" width="16" height="8" fill="#1f2937" rx="2" />
    {/* Eyes */}
    <circle cx="85" cy="105" r="3" fill="#1f2937" />
    <circle cx="115" cy="105" r="3" fill="#1f2937" />
  </svg>
)

export default function ImportWallet() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <FoxIcon />
        </div>

        <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <span className="text-sm">English</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Navigation */}
        <div className="flex items-center space-x-4 mb-8">
          <ArrowLeft className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <span className="text-sm text-gray-500">Step 1 of 2</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">Import a wallet</h1>

        {/* Form */}
        <div className="space-y-6">
          {/* Input Field */}
          <div className="relative">
            <div className="flex items-center space-x-3">
              <input
                type="password"
                placeholder="Enter your..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Info className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-400 transition-colors" />
            </div>
          </div>

          {/* Large Text Area */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[320px]">
            <textarea
              placeholder="Add a space between each word and make sure no one is watching."
              className="w-full h-full bg-transparent text-gray-300 placeholder-gray-500 resize-none focus:outline-none"
              rows={15}
            />
          </div>

          {/* Action Links */}
          <div className="flex justify-between">
            <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Show all
            </button>
            <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Clear all
            </button>
          </div>
        </div>
      </main>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
        <button className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium py-4 rounded-lg transition-colors shadow-lg">
          Continue
        </button>
      </div>
    </div>
  )
}
