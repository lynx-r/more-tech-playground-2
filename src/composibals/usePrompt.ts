// import { default as prompt } from './prompt.json'
import type { Chat } from '@/types'
const usePrompt = () => {
  const makePrompt = async (messages: Chat) => {
    const _body = {
      modelUri: 'gpt://b1g6v7j9nvt9dilshk76/yandexgpt',
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: '200',
        reasoningOptions: {
          mode: 'DISABLED',
        },
      },
      messages,
    }
    // const res = await fetch('/yandex-gpt-api/foundationModels/v1/completion', {
    //   body: JSON.stringify(body),
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${import.meta.env.VITE_IAM_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    // })

    console.log(messages)
    return {
      role: 'assistant' as const,
      text: 'Можно пожробнне про технологию X',
    }
  }

  return {
    makePrompt,
  }
}

export default usePrompt
