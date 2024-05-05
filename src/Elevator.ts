class Elevator {
  private elevatorElement: HTMLDivElement;
  private currentFloor: number;

  constructor(floor: number) {
    this.currentFloor = floor;
    this.elevatorElement = document.createElement("div");
    this.elevatorElement.classList.add("elevator");

    const imageElement = document.createElement("img");
    imageElement.src = "./src/assets/elv.png";
    imageElement.alt = "Elevator Image";

    // imageElement.style.width = "50px"; // שינוי רוחב התמונה
    // imageElement.style.height = "100px"; // שינוי גובה התמונה

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
}
