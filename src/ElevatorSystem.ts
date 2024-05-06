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

  public handleFloorRequest(eventData: FloorButtonEvent) {
    console.log(`elevator to floor number:${eventData.floorNumber}`);
    this.moveElvToFloor(0, eventData.floorNumber);
  }

  private moveElvToFloor(elvIndex: number, destinationFloor: number) {
    this.elevators[elvIndex].setIsAvailable(false)
    const currentFloor = this.elevators[elvIndex].getCurrentFloor();
    const delta = destinationFloor - currentFloor;

    const elvElement = this.elevators[elvIndex].getElement();
    const currentBottom = parseInt(elvElement.style.bottom || "0");
    const targetBottom = currentBottom + delta * 110;

    // Smooth animation of the elevator
    let duration = Math.abs(delta) * 500; // Adjust duration based on floor difference
    elvElement.style.transition = `bottom ${duration / 1000}s ease-in-out`;
    elvElement.style.bottom = `${targetBottom}px`;

    // Update the elevator's current floor after the animation finishes
    setTimeout(() => {
      this.elevators[elvIndex].setCurrentFloor(destinationFloor);
      elvElement.style.transition = ""; // Remove transition after animation ends
    }, duration);

    // Delay at the destination floor
    setTimeout(() => {
      // Additional actions to perform after the elevator reaches the destination floor
      console.log(`Elevator reached floor ${destinationFloor}`);
      this.elevators[elvIndex].setIsAvailable(true)
    }, duration + 2000); // 2000ms (2 seconds) delay at the destination floor
  }

  public getElement(): HTMLDivElement {
    return this.elvSystemElement;
  }
}
