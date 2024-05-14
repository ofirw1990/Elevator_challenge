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

  public getElement(): HTMLDivElement {
    return this.elvSystemElement;
  }

  // Handles a floor button press event, assigns the task to the closest available elevator,
  // and returns the estimated arrival time in seconds
  public handleFloorRequest(eventData: FloorButtonEvent): number {
    const elevatorIndex = this.findClosestElevator(eventData.floorNumber);
    const availabilityTime = this.elevators[elevatorIndex].addTask(
      eventData.floorNumber
    );
    const taskLength = this.elevators[elevatorIndex].getTaskListLength();
    const deviation = 300 * taskLength * taskLength;
    return availabilityTime - 2000 - deviation;
  }

  private findClosestElevator(destinationFloor: number): number {
    // Check if any elevator is already on the requested floor
    for (let index = 0; index < this.elevators.length; index++) {
      if (this.elevators[index].getCurrentFloor() == destinationFloor) {
        return index;
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
    return elevatorIndex;
  }
}
