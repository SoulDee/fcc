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
  _formula = "";
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
          this._queue.push({ type: 0, text, key: -1 });
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
          this._queue.push({ type: 0, text: "0", key: -1 });
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
          this._queue.push({ type: 0, text, key: -1 });
        } else {
          if (this._lastIsNumber()) {
            if (this._last().text === "-") {
              this._queue = [...this._queue.slice(0, this._queue.length - 1)];
              this._last().text = text;
            } else {
              this._queue.push({ type: 1, text, key })
            }
          } else {
            this._queue.push({ type: 0, text, key: -1 });
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
            this._last().key = key;
          } else {
            this._queue.push({ type: 1, text, key })
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
    this._setFormula();
    this._updateFormula();

    return result;
  }

  formula() {
    return this._formula;
  }

  _updateFormula() { }

  _setFormula() {
    this._formula = this._queue.reduce((res, next) => {
      return res + (next.type === 0 && next.text.startsWith("-") ? `(${next.text})` : next.text);
    }, "");
  }

  _empty() {
    return this._queue.length === 0;
  }


  _lastIsNumber() {
    return this._last().type === 0;
  }

  _last() {
    return this._queue[this._queue.length - 1];
  }

  _calc() { };
  _handleEqualTouched() { };
}

class ImmediateExcutionModel extends CalcLogicModel {
  constructor() {
    super()
  }

  _updateFormula() {
    if (this._equalTouched) {
      this._formula = this._formula + "=" + this._calc();
    }
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
}

class FormulaTree {
  _root = null;

  isEmpty() {
    return !!this._root;
  }

  value() {
    return this._root.value();
  }

  append(node) {
    if (!this._root) {
      this._root = node;
    } else {
      if (this._root.priority() <= node.priority()) {
        node._left = this._root;
        node._left._parent = node;
        this._root = node;
        this._root._parent = null;

      } else {
        if (this._root._left) {
          if (this._root._right) {
            this._root._right.append(node);
          } else {
            this._root._right = node;
            node._parent = this._root;
          }
        } else {
          this._root._left = node;
          node._parent = this._root;
        }
      }
    }
  }
}

class FormulaTreeNode {
  _key = -1;
  _value = "";
  _left = null;
  _right = null;
  _parent = null;

  constructor(key, value) {
    this._key = key;
    this._value = value;
  }

  value() {
    return this.isLeaf() ? parseFloat(this._value) : this.calc();
  }

  isLeaf() {
    return !this._left && !this._right && this.isNumber();
  }

  isNumber() {
    return this._key >= -1 && this._key <= 9;
  }

  priority() {
    let result = -1;
    switch (this._key) {
      case 0: case 1: case 2: case 3:
      case 4: case 5: case 6: case 7:
      case 8: case 9: case 10: case -1:
        result = 1;
        break;
      case 11:
      case 12:
        result = 3;
        break;
      case 13:
      case 14:
        result = 2;
        break;
      default:
        break;
    }
    return result;
  }

  append(node) {

    if (node.priority() >= this.priority()) {
      node._parent = this._parent;
      node._parent._right = node;
      this._parent = node;
      node._left = this;
    } else {
      if (this._left) {
        if (this._right) {
          this._right.append(node);
        } else {
          this._right = node;
          node._parent = this;
        }
      } else {
        this._left = node;
        node._parent = this;
      }
    }
  }

  calc() {
    const left = this._left.value();
    const right = this._right.value();
    switch (this._key) {
      case 11:
        return left + right;
      case 12:
        return left - right;
      case 13:
        return left * right;
      case 14:
        return left / right;
    }
  }
}

class FormulaLogicModel extends CalcLogicModel {
  constructor() {
    super();
  }

  _calc() {
    let tree = new FormulaTree();

    for (let i = 0; i < this._queue.length; i++) {
      const { key, text } = this._queue[i];
      let node = new FormulaTreeNode(key, text);
      tree.append(node);
    }

    const result = tree.value();

    this._cache = this._formula;
    this._queue = [{ key: -1, text: result + "", type: 0 }];

    return result;
  }

  _updateFormula() {
    
  }
}

export default {
  Operators,
  ImmediateExcutionModel,
  FormulaLogicModel
}