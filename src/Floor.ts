class Floor {
  private isLocked: boolean;
  private floorElement: HTMLDivElement;
  private buttonElement: HTMLButtonElement;
  private timerElement: HTMLDivElement;
  private timer: number;

  constructor(
    floorNumber: number,
    // Callback function to be executed when the floor button is pressed
    private onButtonPressCallback: (eventData: FloorButtonEvent) => void
  ) {
    this.isLocked = false;

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
    this.timerElement.textContent = "";
    this.floorElement.appendChild(this.timerElement);

    document.body.appendChild(this.floorElement);

    // Add event listener to the button for floor press
    this.buttonElement.addEventListener("click", () => {
      if (!this.isLocked) {
        const eventData: FloorButtonEvent = {
          floorNumber: floorNumber,
        };
        this.isLocked = true;
        this.onButtonPressCallback(eventData);
      }
    });
  }

  public getElement(): HTMLDivElement {
    return this.floorElement;
  }

  public getFloorNumber() {
    return parseInt(this.buttonElement.textContent || "0");
  }

  // Starts a timer countdown to visually represent the remaining waiting time
  public startTimer(arrivalTime: number) {
    this.buttonElement.style.color = "green";
    let timeLeft = Math.round((arrivalTime - Date.now()) / 1000);

    // Use setTimeout for immediate (slightly delayed) update
    setTimeout(() => {
      if (timeLeft < 0) {
        this.isLocked = false;
        this.buttonElement.style.color = "";
        this.timerElement.textContent = "";
        clearInterval(timerInterval);
        return;
      }
      this.timerElement.textContent = timeLeft.toString();
      timeLeft--;
    }, 10);

    const timerInterval = setInterval(() => {
      if (timeLeft < 0) {
        this.isLocked = false;
        this.buttonElement.style.color = "";
        this.timerElement.textContent = "";
        clearInterval(timerInterval);
        return;
      }
      this.timerElement.textContent = timeLeft.toString();
      timeLeft--;
    }, 1000);
  }
}
