import React from 'react';
import { Alert, Text, View } from 'react-native';
import InputButton from './InputButton';
import Style from './Style';

const inputButtons = [
    ['C', 'CE'],
    [7, 8, 9, '/'],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    ['.', 0, '=', '+']
];


export default class ReactCalculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        previousInputValue: 0,
        inputValue: 0,
        displayInput: 0,
        decimalCount: -1,
        selectedSymbol: null
      }
    }

    render() {
      return (
        <View style={Style.rootContainer}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>{this.state.displayInput}</Text>
          </View>
          <View style={Style.inputContainer}>
            {this._renderInputButtons()}
          </View>
        </View>
      )
    }

    _renderInputButtons() {
      let views = [];

      for (var r = 0; r < inputButtons.length; r++) {
        let row = inputButtons[r];

        let inputRow = [];
        for (var i = 0; i < row.length; i++) {
          let input = row[i];

          inputRow.push(
            <InputButton value={input}
              highlight={this.state.selectedSymbol === input}
              onPress={this._onInputButtonPressed.bind(this, input)}
              key={r + "-" + i} />
          );
        }

        views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
      }

      return views;
    }

    _onInputButtonPressed(input) {
      switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)

        }
    }
    _handleNumberInput(num) {
      if (this.state.decimalCount>=0) {
        this.state.decimalCount++
        var inputValue = (num /(Math.pow(10, this.state.decimalCount))) + this.state.inputValue
      }
      else {
        var inputValue = (this.state.inputValue * 10) + num
      }
      this.setState({
          inputValue: inputValue,
          displayInput: inputValue,
      })
    }
    _handleStringInput(str) {
      switch (str) {
        case '/':
        case '*':
        case '+':
        case '-':
          this.setState({
              decimalCount: -1,
              selectedSymbol: str,
              displayInput: str,
              inputValue: 0,
              previousInputValue: this.state.inputValue,
          });
          break;
        case '.':
          this.setState({
            displayInput: '.',
            decimalCount: this.state.decimalCount + 1
          });
          break;
        case '=':
          let symbol = this.state.selectedSymbol,
              inputValue = this.state.inputValue,
              displayInput = this.state.displayInput,
              previousInputValue = this.state.previousInputValue;
              decimalCount = -1
          if (!symbol) {
              return;
          }
          // console.log(previousInputValue + symbol + inputValue)
          this.setState({
              previousInputValue: 0,
              displayInput: eval(previousInputValue + symbol + inputValue),
              inputValue: eval(previousInputValue + symbol + inputValue),
              selectedSymbol: null,
              decimalCount: -1
          });
          break;
        case 'CE':
          this.setState ({
            previousInputValue: 0,
            inputValue: 0,
            displayInput: 0,
            decimalCount: -1,
            selectedSymbol: null
          })
          break;
        case 'C':
          // console.log('decimalcount' + this.state.decimalCount)
          if (this.state.decimalCount > 0) {
            console.log('decimalCount ' + this.state.decimalCount)
            let val = this.state.inputValue*(Math.pow(10, this.state.decimalCount))
            var inputVal = Math.trunc(val/10)
            this.state.decimalCount--
            inputVal = inputVal / Math.pow(10, this.state.decimalCount)
            console.log('hghghghhg' + '   if   '+ inputVal)
          }
          else {
            var inputVal = Math.trunc(this.state.inputValue / 10)
            console.log('hghghghhg' +'   else  ' + inputVal)
          }
          this.setState({
            inputValue: inputVal,
            displayInput: inputVal,
          })
      }
    }
  }


// console.log('App')
