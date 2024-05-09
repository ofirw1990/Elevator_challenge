class ElevatorSystem {
  private elvSystemElement: HTMLDivElement;
  private elevators: Elevator[];

  constructor(numElevator: number) {
    this.elvSystemElement = document.createElement("div");
    this.elvSystemElement.classList.add("elvSystem");

    this.elevators = Array.from(
      { length: numElevator },
      (_, i) => new Elevator()
    );

    this.elevators.forEach((elevator) => {
      this.elvSystemElement.appendChild(elevator.getElement());
    });
  }

  // Handles a floor button press event, assigns the task to the closest available elevator, and returns the estimated arrival time in seconds
  public handleFloorRequest(eventData: FloorButtonEvent): number {
    const elevatorData = this.findClosestElevator(eventData.floorNumber);
    const elevatorIndex = elevatorData[0];
    const minimumTime = elevatorData[1];
    this.elevators[elevatorIndex].addTask(eventData.floorNumber);

    return minimumTime / 1000;
  }

  private findClosestElevator(destinationFloor: number): number[] {
    // Check if any elevator is already on the requested floor
    for (let index = 0; index < this.elevators.length; index++) {
      if (this.elevators[index].getCurrentFloor() == destinationFloor) {
        return [index, 0];
      }
    }
    let minimumTime = this.elevators[0].getArrivalTime(destinationFloor);
    let elevatorIndex = 0;
    const length = this.elevators.length;
    for (let index = 1; index < length; index++) {
      const temp = this.elevators[index].getArrivalTime(destinationFloor);
      if (temp < minimumTime) {
        minimumTime = temp;
        elevatorIndex = index;
      }
    }
    return [elevatorIndex, minimumTime];
  }

  public getElement(): HTMLDivElement {
    return this.elvSystemElement;
  }
}
