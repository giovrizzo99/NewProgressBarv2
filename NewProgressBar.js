(function () {
  let template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
          display: block;
          width: 100%;
          height: 50px; /* Default height, can be changed dynamically */
          position: relative;
      }

      .progress-container {
          width: 100%;
          height: 100%;
          background-color: var(--emptyBarColor, #a9b4be);
          border-radius: 25px;
          position: relative;
          overflow: hidden;
      }

      .progress-bar {
          height: 100%;
          background: linear-gradient(to right, #05446b, #69a8e2);
          width: 50%; /* Default value, updated dynamically */
          border-radius: 25px;
          transition: width 0.5s ease-in-out;
      }

      .progress-indicator {
          position: absolute;
          top: 0;
          height: 100%;
          width: auto;
          aspect-ratio: 1 / 1; /* Ensures it's a circle */
          border-radius: 50%;
          background-color: #05446b;
          border: 3px solid #69a8e2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          font-weight: bold;
          white-space: nowrap;
          padding: 0 10px;
          transition: left 0.5s ease-in-out;
      }
    </style>

    <div class="progress-container">
      <div class="progress-bar"></div>
      <div class="progress-indicator">50%</div>
    </div>
  `;

  class ProgressBarWidget extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }

    connectedCallback() {
      this.updateProgress();
    }

    updateProgress() {
      const progressBar = this.shadowRoot.querySelector(".progress-bar");
      const progressIndicator = this.shadowRoot.querySelector(".progress-indicator");
      const container = this.shadowRoot.querySelector(".progress-container");

      // Get values from properties or use defaults
      const percentage = this._props.percentage || 50;
      const emptyBarColor = this._props.emptyBarColor || "#a9b4be";

      // Apply styles
      container.style.backgroundColor = emptyBarColor;
      progressBar.style.width = `${percentage}%`;
      progressIndicator.textContent = `${percentage}%`;

      // Get actual height (which is also the width of the circle)
      const circleSize = container.style.height; // Since height = width for the circle

      // Adjust percentage so that the **center** of the circle never moves beyond half its size
      const adjustedPercentage = Math.max(
        (circleSize / 2) / container.style.height * 100,  // Minimum percentage (half circle width)
        Math.min(percentage, 100 - (circleSize / 2) / container.style.width * 100) // Max percentage
      );

      // Move the circle
      progressIndicator.style.left = `${adjustedPercentage}%`;
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this.updateProgress();
    }
  }

  customElements.define("com-gr-sap-newprogressbar", ProgressBarWidget);
})();
