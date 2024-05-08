class Elevator {
  private elevatorElement: HTMLDivElement;
  private currentFloor: number;
  private elevatorAvailabilityTime: number;

  constructor() {
    this.elevatorAvailabilityTime = 0;
    this.currentFloor = 1;
    this.elevatorElement = document.createElement("div");
    this.elevatorElement.classList.add("elevator");

    const imageElement = document.createElement("img");
    imageElement.src = "./src/assets/elv.png";
    imageElement.alt = "Elevator Image";

    this.elevatorElement.appendChild(imageElement);

    document.body.appendChild(this.elevatorElement);

    this.elevatorElement.style.bottom = "0px";
  }

  public getElement(): HTMLDivElement {
    return this.elevatorElement;
  }

  public getArrivalTime(destinationFloor: number): number {
    const delta = destinationFloor - this.currentFloor;
    if (this.elevatorAvailabilityTime == 0) {
      return Math.abs(delta) * 500;
    }

    let timeToBeAvailable = this.elevatorAvailabilityTime - Date.now();
    return timeToBeAvailable + Math.abs(delta) * 500;
  }

  public moveToFloor(destinationFloor: number): number {
    const delta = destinationFloor - this.currentFloor;
    const currentBottom = parseInt(this.elevatorElement.style.bottom || "0");

    let duration = Math.abs(delta) * 500;
    const targetBottom = currentBottom + delta * 110;

    this.elevatorAvailabilityTime = Date.now() + duration + 2000;

    this.elevatorElement.style.transition = `bottom ${
      duration / 1000
    }s ease-in-out`;
    this.elevatorElement.style.bottom = `${targetBottom}px`;

    setTimeout(() => {
      const audioElement = new Audio("./src/assets/ding.mp3");
      audioElement.play();
      this.currentFloor = destinationFloor;

      this.elevatorElement.style.transition = "";
    }, duration);

    setTimeout(() => {
      this.elevatorAvailabilityTime = 0;
    }, duration + 2000);
    return duration / 1000;
  }
}
