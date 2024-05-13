// Interface defining the data format for a floor button press event
interface FloorButtonEvent {
  floorNumber: number;
}

class Building {
  private buildingElement: HTMLDivElement;
  private floors: Floor[];
  private elvSystem: ElevatorSystem;

  constructor(numFloors: number, numElevators: number) {
    // Create the elevator system with the specified number of elevators
    this.elvSystem = ElevatorSystemFactory.createElevatorSystem(numElevators);

    // Callback function to handle floor button press events
    const handleFloorRequest = (eventData: FloorButtonEvent) => {
      const duration = this.elvSystem.handleFloorRequest(eventData);
      this.updateFloorTimer(eventData.floorNumber, duration);
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
    return this.buildingElement
  }

  private updateFloorTimer(floorNumber: number, duration: number) {
    // Find the floor object that matches the requested floor number
    const floor = this.floors.find(
      (floor) => floor.getFloorNumber() === floorNumber
    );
    if (floor) {
      const timer = Math.round(duration);
      floor.updateTimer(timer);
    }
  }
}
