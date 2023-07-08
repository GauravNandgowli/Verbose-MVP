///tokens
const LETTER = /[a-zA-Z]/;
const WHITESPACE = /\s+/;
const NUM = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const OPERATORS = ["+", "-", "*", "/", "%" ,">","<","=","!","."];
const keywords = ["if", "else", "while", "for", "do", "break", "continue" , "let"];


const isLetter = (character) => LETTER.test(character);
const isKeyword = (word) => keywords.includes(word);
const isWhitespace = (character) => WHITESPACE.test(character);
const isNumber = (character) => NUM.includes(character);

const isOpeningParenthesis = (character) => character === "(";
const isClosingParenthesis = (character) => character === ")";

const isOpeningCurly = (character) => character === "{";
const isClosingCurly = (character) => character === "}";

const isParenthesis = (character) =>
  isOpeningParenthesis(character) || isClosingParenthesis(character);

  const isCurly = (character) =>
  isOpeningCurly(character) || isClosingCurly(character);

const isQuote = (character) => character === '"';
const isOperator = (character) => OPERATORS.includes(character);
// ---------------------------------------------------------------------------------------------------------
const tokenize = (input) => {
  
  let cur = 0;
  const tokens = [];
  while (cur < input.length) 
  {
    const character = input[cur];
   
    if (isParenthesis(character)) {
      tokens.push({
        type: "parenthesis",
        value: character,
      });
      cur++;        
      continue;
    }

    if (isCurly(character)) {
        tokens.push({
          type: "CurlyBracket",
          value: character,
        });
        cur++; 
        continue;
      }

    if (isWhitespace(character)) {
      cur++;
      continue;
    }

    if (isNumber(character)) {

      let digit = character;     
      
      while (isNumber(input[++cur])) {        
        digit += input[cur];
        console.log(digit);     
           
        if (input[cur] === ".") {
          
          while (isNumber(input[++cur])) {
            digit += input[cur];           
          }
          tokens.push({
            type: "Float",
            value: digit,
          });
          break;
        }
      }
     if(!digit.includes(".")){
      tokens.push({
        type: "Integer",
        value: digit,
      });
    }
      continue;
    }

    if (isLetter(character)) {
      let symbol = character;
      while (isLetter(input[++cur])) {
        symbol += input[cur];
      }
      tokens.push({
        type: "name",
        value: symbol,
      });

      continue;
    }

    if(isKeyword(character)){
        tokens.push[{
            type: "keyword",
            value: character,
        }]
        cur++;
        continue;}

if(isOperator(character)){
    tokens.push({
        type: "operator",
        value: character,
    });
    cur++;
    continue;
}

    if (isQuote(character)) {
      let string = "";
      while (!isQuote(input[++cur])) {
        string += input[cur];
      }
      tokens.push({
        type: "string",
        value: string,
      });
      cur++;
      continue;
    }
    cur++;  
    throw new TypeError("Invalid Character: " + input[cur]);
}


return tokens;


 
};

const input = "  1.23.4  5.6 ";

console.log(tokenize(input));
