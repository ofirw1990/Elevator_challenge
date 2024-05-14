// Interface defining the data format for a floor button press event
interface FloorButtonEvent {
  floorNumber: number;
}

class Building {
  private buildingElement: HTMLDivElement;
  private floors: Floor[];
  private elvSystem: ElevatorSystem;

  constructor(numFloors: number, numElevators: number) {
    // Check for non-integer or negative values
    if (
      numFloors <= 0 ||
      !Number.isInteger(numFloors) ||
      numElevators <= 0 ||
      !Number.isInteger(numElevators)
    ) {
      throw new Error(
        "Invalid number of floors or elevators. Both must be positive integers."
      );
    }

    // Create the elevator system with the specified number of elevators
    this.elvSystem = ElevatorSystemFactory.createElevatorSystem(numElevators);

    // Callback function to handle floor button press events
    const handleFloorRequest = (eventData: FloorButtonEvent) => {
      const arrivalTime = this.elvSystem.handleFloorRequest(eventData);
      this.updateFloorTimer(eventData.floorNumber, arrivalTime);
    };

    // Create floors with floor numbers counting down from the top floor
    this.floors = Array.from(
      { length: numFloors },
      (_, i) => new Floor(numFloors - i, handleFloorRequest)
    );

    this.buildingElement = document.createElement("div");
    this.buildingElement.classList.add("building");

    const floorsContainer = document.createElement("div");
    floorsContainer.classList.add("floors");

    this.floors.forEach((floor) => {
      floorsContainer.appendChild(floor.getElement());
    });

    this.buildingElement.appendChild(floorsContainer);
    this.buildingElement.appendChild(this.elvSystem.getElement());
  }

  public getBuildingElement(): HTMLDivElement {
    return this.buildingElement;
  }

  private updateFloorTimer(floorNumber: number, arrivalTime: number) {
    this.floors[this.floors.length - floorNumber].startTimer(arrivalTime);
  }
}
