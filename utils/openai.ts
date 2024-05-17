import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const model = "gpt-3.5-turbo"

async function completion(messages: ChatCompletionRequestMessage[]) {
    const completion = await openai.createChatCompletion({
        model,
        messages,
    });
    return completion.data.choices[0]
}

export { completion }