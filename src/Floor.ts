class Floor {
  private floorElement: HTMLDivElement;
  private buttonElement: HTMLButtonElement;

  constructor(
    floorNumber: number,
    private onButtonPressCallback: (eventData: FloorButtonEvent) => void
  ) {
    this.floorElement = document.createElement("div");
    this.floorElement.classList.add("floor");

    this.buttonElement = document.createElement("button");
    this.buttonElement.classList.add("floor-button"); // הוספת הכינוי floor-button

    this.buttonElement.textContent = floorNumber.toString();

    this.floorElement.appendChild(this.buttonElement);

    document.body.appendChild(this.floorElement);

    this.buttonElement.addEventListener("click", () => {
      const eventData: FloorButtonEvent = {
        floorNumber: floorNumber,
      };
      this.onButtonPressCallback(eventData);
    });
  }

  public getElement(): HTMLDivElement {
    return this.floorElement;
  }
}
