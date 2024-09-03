const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config/config");

const genAI = new GoogleGenerativeAI(config.api);
const parsingQuery = async (query) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Extract list of entities from the following query. Return a final string which holds entities between a comma, no explain, no comment: ${query}`;
    const result = await model.generateContent(prompt);
    const parsedResult = result.response?.text();
    
    const listEntities = parsedResult.split(',').map(entity => entity.trim());
    return listEntities;
  } catch (error) {
    console.error("Error making API request:", error);
  }
};

module.exports = parsingQuery;