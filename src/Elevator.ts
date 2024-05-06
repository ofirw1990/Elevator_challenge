class Elevator {
  private elevatorElement: HTMLDivElement;
  private currentFloor: number;
  private isAvailable: boolean

  constructor(floor: number) {
    this.isAvailable = true
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

  public setIsAvailable(newState:boolean) {
    this.isAvailable = newState
  }
}
