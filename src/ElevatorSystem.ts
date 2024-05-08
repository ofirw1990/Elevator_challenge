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

  private findClosestElevator(destinationFloor: number):number {
    let minimumTime = this.elevators[0].getArrivalTime(destinationFloor);
    let elevatorIndex = 0;
    const length = this.elevators.length
    for (let index = 1; index < length; index++) {
      const temp = this.elevators[index].getArrivalTime(destinationFloor)
      if(temp < minimumTime) {
        minimumTime = temp
        elevatorIndex = index
      }
    } 
    console.log("elevatorIndex"+elevatorIndex)
    return elevatorIndex;
  }

  public getElement(): HTMLDivElement {
    return this.elvSystemElement;
  }
}
