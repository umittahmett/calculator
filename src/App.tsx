import { Calculator, Divide, Equal, Minus, Percent, Plus, X } from 'lucide-react';
import './index.css'
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { ButtonProps } from './types';
function App() {
  const buttons: ButtonProps[] = [
    { label: 'AC', kind: 'operator', operation: 'clear' },
    { kind: 'operator', label: 'DE', operation: 'delete' },
    { icon: Percent, kind: 'operator', label: '%', operation: "percentage" },
    { icon: Divide, kind: 'operator', label: '÷', operation: "division" },
    { label: '7', kind: 'character' },
    { label: '8', kind: 'character' },
    { label: '9', kind: 'character' },
    { icon: X, kind: 'operator', label: 'x', operation: 'multiplication' },
    { label: '4', kind: 'character' },
    { label: '5', kind: 'character' },
    { label: '6', kind: 'character' },
    { icon: Minus, kind: 'operator', label: '-', operation: 'subtraction' },
    { label: '1', kind: 'character' },
    { label: '2', kind: 'character' },
    { label: '3', kind: 'character' },
    { icon: Plus, kind: 'operator', label: '+', operation: 'addition' },
    { icon: Calculator, kind: 'operator', operation: 'equals' },
    { label: '0', kind: 'character' },
    { label: '.', kind: 'character', operation: 'decimal-point' },
    { icon: Equal, kind: 'operator', operation: 'equals' },
  ];

  const [currentValue, setCurrentValue] = useState<string>('0');
  const [isEqualPressed, setIsEqualPressed] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>('');
  const operationCharacters = ['+', '-', 'x', '÷'];

  // Normalize the expression
  const normalizeExpression = (expression: string) => {
    return expression
      .replace(/x/g, '*')
      .replace(/÷/g, '/')
  };
  const normalizedExpression = useMemo(() => normalizeExpression(currentValue), [currentValue]);

  // Calculate the expression
  const calculate = () => new Function(`return ${normalizedExpression}`)();

  // Handle button press
  const handleButtonPress = (button: ButtonProps) => {
    switch (button.kind) {
      case 'character':
        if (currentValue === '0' && button.label === '0') {
          setCurrentValue('0');
        }
        else if (currentValue === '0' && button.label !== '0' && button.label !== '.') {
          setCurrentValue(button.label!);
        }
        else if ((button.label === '.' && operationCharacters.includes(currentValue.charAt(currentValue.length - 1))) || (button.label === '.' && currentValue.charAt(currentValue.length - 1) == '.')) {
          break;
        }
        else {
          isEqualPressed ? setCurrentValue(button.label!) : setCurrentValue(currentValue + button.label); setIsEqualPressed(false);
        }
        break;
      case 'operator':
        if (button.operation === 'clear') {
          setCurrentValue('0');
          setExpression('');
          setIsEqualPressed(false);
        }
        else if (button.operation === 'equals') {
          if (currentValue.charAt(currentValue.length - 1) != '.' && !operationCharacters.includes(currentValue.charAt(currentValue.length - 1))) {
            setCurrentValue(calculate().toString().length > 8 ? calculate().toExponential(3).toString() : calculate().toString());
            setExpression(currentValue);
            setIsEqualPressed(true);
          }
        }
        else if (button.operation === 'delete') {
          currentValue.length == 1 ? setCurrentValue('0') : setCurrentValue(currentValue.slice(0, currentValue.length - 1));
          setIsEqualPressed(false);
        }
        else if (currentValue.charAt(currentValue.length - 1) === '.') {
          setCurrentValue(currentValue.slice(0, currentValue.length - 1) + button.label)
        }
        else if (operationCharacters.includes(currentValue.charAt(currentValue.length - 1)) && operationCharacters.includes(button.label!)) {
          break;
        }
        else {
          setIsEqualPressed(false);
          setCurrentValue(currentValue + button.label)
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="w-full select-none h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[300px] bg-zinc-800 border relative border-zinc-500 rounded-2xl p-6">
        <div className='w-full relative'>
          <div className={clsx('text-zinc-500 text-xl font-medium text-end duration-200 h-8', isEqualPressed ? 'opacity-100' : 'opacity-0')}>
            {expression}
          </div>
          <div className="text-white font-medium hide-scroll w-full text-end text-5xl mb-4 overflow-x-auto whitespace-nowrap overflow-y-hidden flex flex-row-reverse">
            <div className="inline-block w-max text-end">{currentValue}</div>
          </div>
          <div className="w-6 h-full bg-gradient-to-r from-zinc-800 to-transparent absolute left-0 top-0"></div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button: ButtonProps, index: number) => (
            <button onClick={() => handleButtonPress(button)}
              key={index} className={clsx("rounded-full size-14 text-2xl font-medium flex items-center text-white justify-center bg-zinc-600",
                {
                  '!bg-orange-500': index % 4 === 3,
                  '!bg-zinc-500': index < 3,
                }
              )}>
              {button.icon ?
                <button.icon className='size-5 text-white' />
                :
                button.label
              }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;