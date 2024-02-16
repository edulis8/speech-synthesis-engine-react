const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  const result = await fetch("http://localhost:5174/content");
  const data = await result.json();
  return data;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  if (content.indexOf("<speak>") !== 0) {
    throw new Error();
  }

  const regexParseSentences = new RegExp("<s>(.*?)</s>", "gi");
  const arr = content.match(regexParseSentences);
  if (!arr || !arr.length) {
    return "";
  }

  const regexStripTags = new RegExp("(<([^>]+)>)", "gi");
  const parsedStringArray = arr.map((el: string) =>
    el.replace(regexStripTags, "")
  );
  return parsedStringArray;
};

export { fetchContent, parseContentIntoSentences };
