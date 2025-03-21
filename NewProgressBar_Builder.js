(function () {
    let template = document.createElement("template");
    template.innerHTML = `
    <br>
    <style>
        #form {
            font-family: Arial, sans-serif;
            width: 400px;
            margin: 0 auto;
        }

        a {
            text-decoration: none;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        td {
            padding: 1px;
            text-align: left;
            font-size: 13px;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 2px solid #ccc;
            border-radius: 5px;
            font-size: 13px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }

        input[type="color"] {
            -webkit-appearance: none;
            border: none;
            width: 32px;
            height: 32px;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        input[type="color"]::-webkit-color-swatch {
            border: none;
        }

        input[type="submit"] {
            background-color: #487cac;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            width: 100%;
        }

        #label {
            width: 140px;
        }
    </style>
    
    <form id="form">
        <table>
            <tr>
                <td>
                    <p>Percentage</p>
                    <input id="builder_percentage" type="number" min="0" max="100" placeholder="Enter Percentage">
                </td>
            </tr>
            <tr>
                <td>
                    <p>Empty Bar Color</p>
                    <input id="builder_emptyBarColor" type="color" placeholder="Select Empty Bar Color">
                </td>
            </tr>
            <tr>
                <td>
                    <p>Start Gradient Color</p>
                    <input id="builder_startColor" type="color" placeholder="Select Start Color">
                </td>
            </tr>
            <tr>
                <td>
                    <p>End Gradient Color</p>
                    <input id="builder_endColor" type="color" placeholder="Select End Color">
                </td>
            </tr>
        </table>
        <input value="Update Settings" type="submit">
        <br>
    </form>
    `;

    class StraightProgressBarBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        percentage: this.percentage,
                        emptyBarColor: this.emptyBarColor,
                        startColor: this.startColor,
                        endColor: this.endColor
                    },
                },
            }));
        }

        set percentage(value) {
            this._shadowRoot.getElementById("builder_percentage").value = value;
        }
        get percentage() {
            return this._shadowRoot.getElementById("builder_percentage").value;
        }

        set emptyBarColor(value) {
            this._shadowRoot.getElementById("builder_emptyBarColor").value = value;
        }
        get emptyBarColor() {
            return this._shadowRoot.getElementById("builder_emptyBarColor").value;
        }

        set startColor(value) {
            this._shadowRoot.getElementById("builder_startColor").value = value;
        }
        get startColor() {
            return this._shadowRoot.getElementById("builder_startColor").value;
        }

        set endColor(value) {
            this._shadowRoot.getElementById("builder_endColor").value = value;
        }
        get endColor() {
            return this._shadowRoot.getElementById("builder_endColor").value;
        }
    }

    customElements.define("com-gr-newprogressbar-builder", StraightProgressBarBuilderPanel);
})();
