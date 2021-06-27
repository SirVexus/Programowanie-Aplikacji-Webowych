class StatsApp {

    inputFieldsNumber: number = 0;
    inputValuesArray: Array<number> = [];

    constructor() {
        const checkInputField: HTMLInputElement = document.querySelector('#inputFieldForGenerator');
        //validation through event listener
        checkInputField.addEventListener('input', (event: Event) => { 
            const target = event.target as HTMLInputElement;
            this.inputFieldsNumber = Number(target.value);
            new ResultUI(this.inputFieldsNumber, this.inputValuesArray);
        });
        new ResultUI(this.inputFieldsNumber, this.inputValuesArray);
    }
}

class InputFieldContainerGenerator{

    numberInput: HTMLInputElement;
    removeInputButton: HTMLButtonElement;
    inputFieldsDiv: HTMLDivElement;
    inputNumber = document.createElement("b")
    inputfields: HTMLDivElement = document.querySelector("#inputFieldsDiv");
   
    constructor(inputId, count, inputValuesArray: Array<number>) {
        //generate inputs
        this.inputNumber.innerText = inputId + 1 + ".";
        this.numberInput = document.createElement('input');
        this.numberInput.type = "number";
        this.numberInput.id = 'input' + inputId;
        this.numberInput.value = inputValuesArray[inputId] ? String(inputValuesArray[inputId]) : '0';
        inputValuesArray[inputId] = Number(this.numberInput.value);
        this.numberInput.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            inputValuesArray[inputId] = Number(target.value);
            new ResultUI(count, inputValuesArray);
        });
        this.removeInputButton = document.createElement('button');
        this.removeInputButton.innerText = "Delete";
        this.removeInputButton.addEventListener('click', (event: Event) => {
            const countInput: HTMLInputElement = document.querySelector('#inputFieldsDiv') as HTMLInputElement;
            inputValuesArray[inputId] = 0;
            inputValuesArray.splice(inputId,1);
            count -= 1;
            countInput.value = count;
            new ResultUI(count, inputValuesArray);
        });
    }
    generateInputFields() : HTMLDivElement 
    {
        //one container per input-field + delete button
        const inputFieldContainer = document.createElement('div');
        inputFieldContainer.className = "inputFieldContainer form-control";
        inputFieldContainer.appendChild(this.inputNumber)
            .appendChild(this.numberInput)
            .appendChild(this.removeInputButton);
       

        return inputFieldContainer;
    }
}

class ComputeResult {
    sumResult = (inputValues: Array<number>) => inputValues.reduce((a, b) => a + b, 0);
    averageResult = (inputValues: Array<number>) => Number((inputValues.reduce((a, b) => a + b, 0)
         /  inputValues.length).toFixed(3));
    minResult = (inputValues: Array<number>) => Math.min(...inputValues);
    maxResult = (inputValues: Array<number>) => Math.max(...inputValues);
}

class ResultUI {

    resultsDiv = document.querySelector('#resultsDiv');
    invalidInputDiv = document.querySelector('#invalidInputDiv')
    errorMessage = document.createElement('b');
    inputFieldsDiv = document.getElementById('inputFieldsDiv');

    constructor(inputsAmount: number, inputValues: Array<number>) 
    {
        let isValid = false;
        this.resultsDiv.innerHTML = null;

        if (inputValues && inputsAmount > 0) {
            isValid = inputValues.every((value) => typeof value === 'number');
            this.generateUI(inputsAmount, inputValues);
            this.invalidInputDiv.innerHTML = "";
        } else {
            this.invalidInputDiv.innerHTML = "";
            const inputsSection = document.getElementById('inputFieldsDiv');
            inputsSection.innerHTML = null;
            this.errorMessage.innerText = "Write a positive number!";
            this.invalidInputDiv.appendChild(this.errorMessage);
        }
    }

    generateInputs(inputsAmount: number, inputValues: Array<number>): void {        
        const breakLine = document.createElement('br');

        this.inputFieldsDiv.innerHTML = null;
        this.inputFieldsDiv.appendChild(breakLine);
        for (let i = 0; i < inputsAmount; i++) {
            const input = new InputFieldContainerGenerator(i,inputsAmount, inputValues).generateInputFields();
            this.inputFieldsDiv.appendChild(input);
        }
    }
    generateUI(inputsAmount: number, inputValues: Array<number>): void {
        const stats = new ComputeResult;
        this.generateInputs(inputsAmount, inputValues);
        const valuesFromInputArray = inputValues.slice(0, inputsAmount);
        const results = [
            this.generateResult('Sum', valuesFromInputArray, stats.sumResult),
            this.generateResult('Avg', valuesFromInputArray, stats.averageResult),
            this.generateResult('Min', valuesFromInputArray, stats.minResult),
            this.generateResult('Max', valuesFromInputArray, stats.maxResult)
        ];
        results.forEach((r: HTMLDivElement) => this.resultsDiv.appendChild(r));
    }
    generateResult(name: string, inputValues: Array<number>, ComputeResult: Function): HTMLDivElement 
    {
        const resultName = document.createElement('p');
        const value = document.createElement('b');
        const container = document.createElement('div');

        resultName.innerText = name;
        value.innerText = ComputeResult(inputValues);
        container.style.float = "left";
        container.style.marginLeft = "20px"
        container.appendChild(resultName);
        container.appendChild(value);
        return container;
    }
}
const statsApp = new StatsApp();