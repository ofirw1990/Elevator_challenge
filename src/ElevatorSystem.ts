class ElevatorSystem {
  private elvSystemElement: HTMLDivElement;
  private elevators: Elevator[];

  constructor(numElevator: number) {
    this.elvSystemElement = document.createElement("div");
    this.elvSystemElement.classList.add("elvSystem");

    this.elevators = Array.from(
      { length: numElevator },
      (_, i) => new Elevator(i + 1)
    );

    this.elevators.forEach((elevator) => {
      this.elvSystemElement.appendChild(elevator.getElement());
    });
  }

  public handleFloorRequest(eventData: FloorButtonEvent): number {
    const elevatorIndex = this.findClosestElevator(eventData.floorNumber);
    const duration = this.elevators[elevatorIndex].moveToFloor(eventData.floorNumber);
    return duration;
  }

  private findClosestElevator(floorNumber: number):number {
    const elevatorIndex = 0;
    return elevatorIndex;
  }

  public getElement(): HTMLDivElement {
    return this.elvSystemElement;
  }
}
