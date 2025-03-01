import axios from "axios";
import { PY_API_URL } from "../configs";

async function correctGrammar(content) {
  try {
    const apiUrl = PY_API_URL + "/grammar/";
    const response = await axios.post(apiUrl, { content });
    return response.data.text;
  } catch {
    return content;
  }
}

async function improviseText(content) {
  try {
    const apiUrl = PY_API_URL + "/improvise/";
    const response = await axios.post(apiUrl, { content });
    return response.data.text;
  } catch {
    return content;
  }
}

const ai = { correctGrammar, improviseText };

export default ai;
