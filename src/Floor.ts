class Floor {
  private floorElement: HTMLDivElement;
  private buttonElement: HTMLButtonElement;
  private timerElement: HTMLDivElement;
  private timer: number;

  constructor(
    floorNumber: number,
    private onButtonPressCallback: (eventData: FloorButtonEvent) => void
  ) {
    this.floorElement = document.createElement("div");
    this.floorElement.classList.add("floor");
    this.buttonElement = document.createElement("button");
    this.buttonElement.classList.add("metal");
    this.buttonElement.classList.add("linear");
    this.buttonElement.textContent = floorNumber.toString();

    this.floorElement.appendChild(this.buttonElement);

    this.timerElement = document.createElement("div");
    this.timerElement.classList.add("timer");
    this.timer = 0;
    this.timerElement.textContent = this.timer > 0 ? this.timer.toString() : "";
    this.floorElement.appendChild(this.timerElement);

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

  public getFloorNumber() {
    return parseInt(this.buttonElement.textContent || "0");
  }
  public updateTimer(timeLeft: number) {
    this.timerElement.textContent = timeLeft.toString();
    this.startTimer(timeLeft);
  }

  private startTimer(duration: number) {
    let timer = duration - 1;
    const timerInterval = setInterval(() => {
      if (timer <= 0) {
        clearInterval(timerInterval);
        this.timerElement.textContent = "";
        return;
      }
      this.timerElement.textContent = timer.toString();
      timer--;
    }, 1000);
  }
  
}
