// import { default as prompt } from './prompt.json'
import type { ChatMessage } from '@/types'
const usePrompt = () => {
  const makePrompt = async (messages: ChatMessage[]) => {
    const body = {
      modelUri: 'gpt://b1g6v7j9nvt9dilshk76/yandexgpt',
      completionOptions: {
        stream: false,
        temperature: 1,
        maxTokens: '50',
        reasoningOptions: {
          mode: 'DISABLED',
        },
      },
      messages,
    }
    const res = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_IAM_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    const responseMessage = data.result.alternatives[0].message

    console.log(responseMessage)
    return responseMessage
  }

  return {
    makePrompt,
  }
}

export default usePrompt
