class Elevator {
  private elevatorElement: HTMLDivElement;
  private currentFloor: number;
  private isAvailable: boolean;

  constructor(floor: number) {
    this.isAvailable = true;
    this.currentFloor = floor;
    this.elevatorElement = document.createElement("div");
    this.elevatorElement.classList.add("elevator");

    const imageElement = document.createElement("img");
    imageElement.src = "./src/assets/elv.png";
    imageElement.alt = "Elevator Image";

    this.elevatorElement.appendChild(imageElement);

    document.body.appendChild(this.elevatorElement);
  }

  public getElement(): HTMLDivElement {
    return this.elevatorElement;
  }

  public getCurrentFloor(): number {
    return this.currentFloor;
  }

  public setCurrentFloor(destinationFloor: number) {
    this.currentFloor = destinationFloor;
  }

  public setIsAvailable(newState: boolean) {
    this.isAvailable = newState;
  }

  public getIsAvailable() {
    return this.isAvailable;
  }

  public moveToFloor(destinationFloor: number):number {
    this.isAvailable = false;

    const delta = destinationFloor - this.currentFloor;

    const currentBottom = parseInt(this.elevatorElement.style.bottom || "0");
    const targetBottom = currentBottom + delta * 110;

    let duration = Math.abs(delta) * 500;
    this.elevatorElement.style.transition = `bottom ${
      duration / 1000
    }s ease-in-out`;
    this.elevatorElement.style.bottom = `${targetBottom}px`;

    setTimeout(() => {
      console.log(`Elevator reached floor ${destinationFloor}`);
      const audioElement = new Audio("./src/assets/ding.mp3");
      audioElement.play();
      this.currentFloor = destinationFloor;
      this.elevatorElement.style.transition = "";
    }, duration);

    setTimeout(() => {
      console.log("Elevator IsAvailable");
      this.isAvailable = true;
    }, duration + 2000);
    return duration / 1000;
  }
}
