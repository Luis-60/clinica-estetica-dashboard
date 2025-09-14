class LexicalHelper {
  jsonParseTwice = (value: string) => {
    if (!value) return "";

    return JSON.parse(JSON.parse(value));
  };
}

export default new LexicalHelper();
