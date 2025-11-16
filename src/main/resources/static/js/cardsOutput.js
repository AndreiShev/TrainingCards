export default class CardsOutput {
    element;

    constructor() {

    }

    template() {
        return `
            <div class="column-chart" style="--chart-height: ${this.chartHeight}">
                <div class="column-chart__title">
                    Total ${this.label}
                    <a href='${this.link}' class="column-chart__link">View all</a>
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">${this.getValue()}</div>
                    <div data-element="body" class="column-chart__chart">
                        ${this.getChartChildren()}
                    </div>
                </div>
            </div>
      `;
    }
}