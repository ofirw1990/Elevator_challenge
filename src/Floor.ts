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
    this.buttonElement.classList.add("floor-button");
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
    this.timerElement.textContent = `Time left: ${timeLeft} seconds`;
    console.log("timer:" + this.timer);
    this.startTimer(timeLeft);
  }

  private startTimer(duration: number) {
    if (duration <= 0) {
      this.timerElement.textContent = ""; // אם הזמן הסתיים, אפס את התוכן של הטיימר
      return;
    }
    this.timerElement.textContent = duration.toString(); // עדכן את הטיימר בכל קריאה לפונקציה
    setTimeout(() => {
      this.startTimer(duration - 1); // קריאה רקורסיבית לעצמה כל 1 שנייה עד שהזמן יגיע ל־0
    }, 1000);
  }
}
