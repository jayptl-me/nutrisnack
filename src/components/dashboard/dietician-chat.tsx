import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getApiUrl } from '@/lib/api';

// Backend API endpoint - using the helper
const CHAT_API_URL = getApiUrl('/api/chat');

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function DieticianChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your nutrition assistant. Feel free to ask me about diet recommendations, nutritional information, or healthy eating habits. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatText = (text: string): string => {
    const formattedText = text
      .replace(/(\d+\.\s*[A-Z][^:]+):/g, '$1:\n')
      .replace(/(\*\*[^*:]+):/g, '$1:\n')
      .replace(/\*\s+/g, '* ');

    return formattedText;
  };

  const renderFormattedText = (text: string): JSX.Element => {
    const formattedText = formatText(text);
    const paragraphs = formattedText.split(/\n\s*\n/);

    return (
      <>
        {paragraphs.map((paragraph, i) => {
          const formattedParagraph = paragraph
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*\s+([^\n]+)/g, '• $1')
            .replace(/\n/g, '<br/>');

          return (
            <p key={i}
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
          );
        })}
      </>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = input;
    setInput('');

    const newUserMessage: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const historyForApi: GeminiMessage[] = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const payload = {
        history: historyForApi,
        message: userMessage,
      };

      console.log("Sending payload to backend API:", JSON.stringify(payload, null, 2));

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        console.error('Backend API error response:', response.status, errorData);
        throw new Error(`Error from backend: ${response.status} ${response.statusText} - ${errorData?.error || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log("Backend API response:", JSON.stringify(data, null, 2));

      const responseText = data.response || "I'm sorry, I couldn't process your request. Please try again.";

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(`Failed to get response: ${error instanceof Error ? error.message : 'Unknown error'}`);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto backdrop-blur-md bg-background/70 border border-primary/10 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-primary/10">
            <AvatarImage src="/dietician-avatar.png" alt="Dietician" />
            <AvatarFallback>
              <Bot className="h-6 w-6 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Nutrition Assistant</CardTitle>
            <CardDescription>Ask questions about nutrition and healthy eating</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start max-w-[80%] space-x-2 ${message.role === 'user'
                    ? 'flex-row-reverse space-x-reverse'
                    : 'flex-row'
                    }`}
                >
                  <Avatar className={`h-8 w-8 shrink-0 ${message.role === 'user' ? 'bg-primary/20' : 'bg-primary/10'}`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-primary" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-3 text-sm ${message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                      }`}
                  >
                    {message.role === 'assistant' ? (
                      renderFormattedText(message.content)
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <Avatar className="h-8 w-8 bg-primary/10 shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </Avatar>
                  <div className="rounded-lg bg-muted px-4 py-3 text-sm flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            placeholder="Ask about nutrition, diet plans, or healthy eating habits..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="bg-background/80 backdrop-blur-sm border-primary/20 flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
