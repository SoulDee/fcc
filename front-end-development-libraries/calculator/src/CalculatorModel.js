const Operators = [
  { id: 'zero', type: 'number', text: '0', key: 0 },
  { id: 'one', type: 'number', text: '1', key: 1 },
  { id: 'two', type: 'number', text: '2', key: 2 },
  { id: 'three', type: 'number', text: '3', key: 3 },
  { id: 'four', type: 'number', text: '4', key: 4 },
  { id: 'five', type: 'number', text: '5', key: 5 },
  { id: 'six', type: 'number', text: '6', key: 6 },
  { id: 'seven', type: 'number', text: '7', key: 7 },
  { id: 'eight', type: 'number', text: '8', key: 8 },
  { id: 'nine', type: 'number', text: '9', key: 9 },
  { id: 'decimal', type: 'number', text: '.', key: 10 },
  { id: 'add', type: 'symbol', text: '+', key: 11 },
  { id: 'subtract', type: 'symbol', text: '-', key: 12 },
  { id: 'multiply', type: 'symbol', text: 'x', key: 13 },
  { id: 'divide', type: 'symbol', text: '/', key: 14 },
  { id: 'clear', type: 'symbol', text: 'AC', key: 15 },
  { id: 'equals', type: 'symbol', text: '=', key: 16 },
];

class CalcLogicModel {
  // type: 0 数字 | 1 符号
  _queue = [];
  _equalTouched = false;

  constructor() {

  }

  input(key, text) {
    let result = text;

    switch (key) {
      // number
      case 0: case 1: case 2: case 3:
      case 4: case 5: case 6: case 7:
      case 8: case 9:
        if (this._equalTouched) {
          this._queue = [];
          this._equalTouched = false;
        }

        if (this._empty() || (!this._empty() && this._last().type === 1)) {
          this._queue.push({ type: 0, text });
        } else {
          const last = this._last();

          if (last.type === 0 && last.text === "0") {
            last.text = text;
          } else {
            last.text += text;
          }
        }

        result = this._last().text;

        break;
      // decimal
      case 10:
        if (this._empty()) {
          this._queue.push({ type: 0, text: "0" });
        }

        if (!this._last().text.includes(".")) {
          this._last().text += ".";
          result = this._last().text;
        }
        break;
      // subtract
      case 12:
        if (this._equalTouched) {
          this._equalTouched = false;
        }

        if (this._empty()) {
          this._queue.push({ type: 0, text });
        } else {
          if (this._lastIsNumber()) {
            if (this._last().text === "-") {
              this._queue = [...this._queue.slice(0, this._queue.length - 1)];
              this._last().text = text;
            } else {
              this._queue.push({ type: 1, text })
            }
          } else {
            this._queue.push({ type: 0, text });
          }
        }
        break;
      // add 11 multiply 13 divide 14 
      case 11:
      case 13:
      case 14:
        if (this._equalTouched) {
          this._equalTouched = false;
        }

        if (this._lastIsNumber()) {
          if (this._last().text === "-") {
            this._queue = [...this._queue.slice(0, this._queue.length - 1)];
            this._last().text = text;
          } else {
            this._queue.push({ type: 1, text })
          }

        } else {
          this._last().text = text;
        }

        break;
      // clear
      case 15:
        this._queue = [];
        this._equalTouched = false;
        result = "0";
        break;
      // equals
      case 16:
        if (this._queue.length > 2) {
          if (this._equalTouched) {
            const symbol = this._queue[this._queue.length - 2];
            const num = this._last();

            this._queue.push(symbol);
            this._queue.push(num);
          }

          this._equalTouched = true;
          result = this._calc();
        } else if (!this._empty()) {
          result = this._queue[0].text;
        }
        break;
      default:
        break;
    }

    return result;
  }

  formula() {
    const formula = this._queue.reduce((res, next) => {
      return res + (next.type === 0 && next.text.startsWith("-") ? `(${next.text})` : next.text);
    }, "");
    return this._equalTouched ? formula + "=" + this._calc() : formula;
  }

  _empty() {
    return this._queue.length === 0;
  }

  _symbol(key) {
    const symbols = {
      11: "+",
      12: "-",
      13: "x",
      14: "/"
    }

    let result = -1;

    for (let i of Object.keys(symbols)) {
      if (symbols[i] === key) {
        result = i;
      }
    }

    return parseInt(result);
  }

  _lastIsNumber() {
    return this._last().type === 0;
  }

  _last() {
    return this._queue[this._queue.length - 1];
  }

  _calc() { };
}

class ImmediateExcutionModel extends CalcLogicModel {
  constructor() {
    super()
  }

  _calc() {
    let touched = false;
    let result = 0;
    let symbol = -1;

    for (let i = 0; i < this._queue.length; i++) {
      const { type, text } = this._queue[i];
      if (!touched && type === 0) {
        result = parseFloat(text);
        touched = true;
      } else {
        if (type === 0 && symbol !== -1) {
          const num = parseFloat(text);
          switch (symbol) {
            case 11: result = result + num;
              break;
            case 12: result = result - num;
              break;
            case 13: result = result * num;
              break;
            case 14: result = result / num;
              break;
            default:
              break;
          }
        } else {
          symbol = this._symbol(text);
        }
      }

    }
    return result;
  }
}

class FormulaLogicModel extends CalcLogicModel {
  // 3 + 5 x 6 - 2 / 4 =
  // 考虑写成一个公式树，如下规则
  // + - 进入根节点，会成为新的父节点，原节点成为左节点
  // * / 进入根节点，如果此时根节点为数字，则成为新的根节点，如果是优先级更低的 + - 操作符，则进入右节点
  // 如果是数字，则成为新的父节点

  // 考虑更多符号，例如 （） 则创建新的节点树，然后嵌套
  // 考虑是否以上规则可以根据优先级延展，例如 数字优先级为 99，+= 优先级为 1， */ 优先级为 2，
  // 优先级高遇到低，成为右节点，优先级低遇高或者优先级相等，将其原来节点左旋，然后成为父节点，

  constructor() {
    super();
  }

  _calc() {
    return "in coding......";
  }
}

export default {
  Operators,
  ImmediateExcutionModel,
  FormulaLogicModel
}