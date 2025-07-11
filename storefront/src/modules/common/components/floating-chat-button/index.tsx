"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import LiveChat from "../live-chat"

const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const openChat = () => {
    setIsChatOpen(true)
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Main Button */}
          <button
            onClick={openChat}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-16 h-16 bg-black hover:bg-black/90 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group"
          >
            <MessageCircle className="w-8 h-8" />
            
            {/* Online Indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </button>

          {/* Tooltip */}
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transform transition-all duration-200">
              Máte otázky? Napíšte nám!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}

          {/* Notification Badge (optional - for unread messages) */}
          {/* Uncomment when you have unread message logic
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            3
          </div>
          */}
        </div>
      </div>

      {/* Live Chat Modal */}
      <LiveChat isOpen={isChatOpen} onClose={closeChat} />
    </>
  )
}

export default FloatingChatButton 