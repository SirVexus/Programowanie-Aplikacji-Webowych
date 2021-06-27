var StatsApp = /** @class */ (function () {
    function StatsApp() {
        var _this = this;
        this.inputFieldsNumber = 0;
        this.inputValuesArray = [];
        var checkInputField = document.querySelector('#inputFieldForGenerator');
        //validation through event listener
        checkInputField.addEventListener('input', function (event) {
            var target = event.target;
            _this.inputFieldsNumber = Number(target.value);
            new ResultUI(_this.inputFieldsNumber, _this.inputValuesArray);
        });
        new ResultUI(this.inputFieldsNumber, this.inputValuesArray);
    }
    return StatsApp;
}());
var InputFieldContainerGenerator = /** @class */ (function () {
    function InputFieldContainerGenerator(inputId, count, inputValuesArray) {
        this.inputNumber = document.createElement("b");
        this.inputfields = document.querySelector("#inputFieldsDiv");
        //generate inputs
        this.inputNumber.innerText = inputId + 1 + ".";
        this.numberInput = document.createElement('input');
        this.numberInput.type = "number";
        this.numberInput.id = 'input' + inputId;
        this.numberInput.value = inputValuesArray[inputId] ? String(inputValuesArray[inputId]) : '0';
        inputValuesArray[inputId] = Number(this.numberInput.value);
        this.numberInput.addEventListener('input', function (event) {
            var target = event.target;
            inputValuesArray[inputId] = Number(target.value);
            new ResultUI(count, inputValuesArray);
        });
        this.removeInputButton = document.createElement('button');
        this.removeInputButton.innerText = "Delete";
        this.removeInputButton.addEventListener('click', function (event) {
            var countInput = document.querySelector('#inputFieldsDiv');
            inputValuesArray[inputId] = 0;
            inputValuesArray.splice(inputId, 1);
            count -= 1;
            countInput.value = count;
            new ResultUI(count, inputValuesArray);
        });
    }
    InputFieldContainerGenerator.prototype.generateInputFields = function () {
        //one container per input-field + delete button
        var inputFieldContainer = document.createElement('div');
        inputFieldContainer.className = "inputFieldContainer form-control";
        inputFieldContainer.appendChild(this.inputNumber)
            .appendChild(this.numberInput)
            .appendChild(this.removeInputButton);
        return inputFieldContainer;
    };
    return InputFieldContainerGenerator;
}());
var ComputeResult = /** @class */ (function () {
    function ComputeResult() {
        this.sumResult = function (inputValues) { return inputValues.reduce(function (a, b) { return a + b; }, 0); };
        this.averageResult = function (inputValues) { return Number((inputValues.reduce(function (a, b) { return a + b; }, 0)
            / inputValues.length).toFixed(3)); };
        this.minResult = function (inputValues) { return Math.min.apply(Math, inputValues); };
        this.maxResult = function (inputValues) { return Math.max.apply(Math, inputValues); };
    }
    return ComputeResult;
}());
var ResultUI = /** @class */ (function () {
    function ResultUI(inputsAmount, inputValues) {
        this.resultsDiv = document.querySelector('#resultsDiv');
        this.invalidInputDiv = document.querySelector('#invalidInputDiv');
        this.errorMessage = document.createElement('b');
        this.inputFieldsDiv = document.getElementById('inputFieldsDiv');
        var isValid = false;
        this.resultsDiv.innerHTML = null;
        if (inputValues && inputsAmount > 0) {
            isValid = inputValues.every(function (value) { return typeof value === 'number'; });
            this.generateUI(inputsAmount, inputValues);
            this.invalidInputDiv.innerHTML = "";
        }
        else {
            this.invalidInputDiv.innerHTML = "";
            var inputsSection = document.getElementById('inputFieldsDiv');
            inputsSection.innerHTML = null;
            this.errorMessage.innerText = "Write a positive number!";
            this.invalidInputDiv.appendChild(this.errorMessage);
        }
    }
    ResultUI.prototype.generateInputs = function (inputsAmount, inputValues) {
        var breakLine = document.createElement('br');
        this.inputFieldsDiv.innerHTML = null;
        this.inputFieldsDiv.appendChild(breakLine);
        for (var i = 0; i < inputsAmount; i++) {
            var input = new InputFieldContainerGenerator(i, inputsAmount, inputValues).generateInputFields();
            this.inputFieldsDiv.appendChild(input);
        }
    };
    ResultUI.prototype.generateUI = function (inputsAmount, inputValues) {
        var _this = this;
        var stats = new ComputeResult;
        this.generateInputs(inputsAmount, inputValues);
        var valuesFromInputArray = inputValues.slice(0, inputsAmount);
        var results = [
            this.generateResult('Sum', valuesFromInputArray, stats.sumResult),
            this.generateResult('Avg', valuesFromInputArray, stats.averageResult),
            this.generateResult('Min', valuesFromInputArray, stats.minResult),
            this.generateResult('Max', valuesFromInputArray, stats.maxResult)
        ];
        results.forEach(function (r) { return _this.resultsDiv.appendChild(r); });
    };
    ResultUI.prototype.generateResult = function (name, inputValues, ComputeResult) {
        var resultName = document.createElement('p');
        var value = document.createElement('b');
        var container = document.createElement('div');
        resultName.innerText = name;
        value.innerText = ComputeResult(inputValues);
        container.style.float = "left";
        container.style.marginLeft = "20px";
        container.appendChild(resultName);
        container.appendChild(value);
        return container;
    };
    return ResultUI;
}());
var statsApp = new StatsApp();
//# sourceMappingURL=index.js.map