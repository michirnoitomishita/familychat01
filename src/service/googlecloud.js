// const apiKey = 'AIzaSyD55gObxBGud7pzBm-Bloy1fjgPvxuREj0';

import { LanguageServiceClient } from '@google-cloud/language';

const client = new LanguageServiceClient({
  keyFilename: 'path/to/your/service-account-key.json',
});

export const analyzeSentiment = async (text) => {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await client.analyzeSentiment({ document });

  const sentiment = result.documentSentiment;
  return {
    score: sentiment.score,
    magnitude: sentiment.magnitude,
  };
};
