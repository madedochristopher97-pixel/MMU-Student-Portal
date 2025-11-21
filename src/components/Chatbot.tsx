import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../store/authStore'
import { supabase, ChatMessage } from '../lib/supabase'

export default function Chatbot() {
  const { user } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && user) {
      loadChatHistory()
    }
  }, [isOpen, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadChatHistory = async () => {
    if (!user) return

    const { data } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: true })
      .limit(50)

    if (data && data.length > 0) {
      setMessages(data)
    } else {
      // Welcome message
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        user_id: user.id,
        message: `Hello ${user.first_name}! 👋 I'm your AI assistant. I can help you with information about your grades, fees, deadlines, courses, and more. What would you like to know?`,
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
      setMessages([welcomeMsg])
    }
  }

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lower = userMessage.toLowerCase()

    // Fetch user data for context
    if (!user) return "Please log in to continue."

    if (lower.includes('gpa') || lower.includes('grade')) {
      const { data } = await supabase
        .from('academic_records')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (data) {
        return `Your current GPA is ${data.gpa.toFixed(2)} out of 4.00. You're in the ${data.percentile}th percentile of your cohort! Great work! 🎓`
      }
    }

    if (lower.includes('fee') || lower.includes('payment') || lower.includes('balance')) {
      const { data } = await supabase
        .from('financial_records')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (data) {
        return `You have a credit balance of Ksh. ${data.credit_balance.toLocaleString()}. Your total billed amount is Ksh. ${data.total_billed.toLocaleString()} and you've paid Ksh. ${data.total_paid.toLocaleString()}. 💰`
      }
    }

    if (lower.includes('deadline') || lower.includes('assignment')) {
      const { data } = await supabase
        .from('deadlines')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('due_date', { ascending: true })
        .limit(3)
      
      if (data && data.length > 0) {
        let response = "Here are your upcoming deadlines:\n\n"
        data.forEach(d => {
          const daysLeft = Math.ceil((new Date(d.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          response += `📌 ${d.title} (${d.course}) - Due in ${daysLeft} days\n`
        })
        return response
      }
    }

    if (lower.includes('help')) {
      return `I'm your student portal assistant! I can help you with:\n\n📊 Academic information (GPA, grades)\n💰 Financial information (fees, payments)\n📅 Deadlines and assignments\n📆 Events and calendar\n\nJust ask me anything!`
    }

    if (lower.includes('hello') || lower.includes('hi')) {
      return `Hello ${user.first_name}! 👋 How can I assist you today?`
    }

    return "I'm not sure I understand. Try asking about your GPA, fees, deadlines, or type 'help' to see what I can do!"
  }

  const sendMessage = async () => {
    if (!input.trim() || !user) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      user_id: user.id,
      message: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Save user message
    await supabase.from('chat_history').insert({
      user_id: user.id,
      message: input,
      sender: 'user'
    })

    // Generate response
    const response = await generateResponse(input)

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      user_id: user.id,
      message: response,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, botMsg])
    setLoading(false)

    // Save bot message
    await supabase.from('chat_history').insert({
      user_id: user.id,
      message: response,
      sender: 'bot'
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="chat-icon">💬</span>
        <span className="chat-text">AI Assistant</span>
      </button>

      {isOpen && (
        <div className="chatbot-container active">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span className="chatbot-icon">🤖</span>
              <span>AI Assistant</span>
            </div>
            <button className="chatbot-minimize" onClick={() => setIsOpen(false)}>−</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className={`message-avatar ${msg.sender}`}>
                  {msg.sender === 'bot' ? '🤖' : user?.first_name[0]}
                </div>
                <div className="message-content">{msg.message}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-message bot">
                <div className="message-avatar bot">🤖</div>
                <div className="message-content typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  )
}
