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

  // private moveElvToFloor(elvIndex:number ,destinationFloor:number ) {
  //   const currentFloor = this.elevators[elvIndex].getCurrentFloor()
  //   const delta = destinationFloor - currentFloor;
  //   console.log(delta)

  //   const elvSystemElement = this.elvSystemElement; // קבענו את משתנה המעלית בטעינה למערכת המעלית

  //   // קבע את גובה המעלית בהתאם למרחק מהקומה הנוכחית
  //   elvSystemElement.style.bottom = `${parseInt(elvSystemElement.style.bottom || '0') + delta * 110}px`;

  //   this.elevators[elvIndex].setCurrentFloor(destinationFloor)

  // }

  private moveElvToFloor(elvIndex: number, destinationFloor: number) {
    const currentFloor = this.elevators[elvIndex].getCurrentFloor();
    const delta = destinationFloor - currentFloor;

    console.log("delta"+delta);
    console.log("bottom" +parseInt(this.elevators[elvIndex].getElement().style.bottom));

    // Set the elevator's bottom position directly to the destination
    this.elevators[elvIndex].getElement().style.bottom += `${delta * 110}px`;
    console.log("bottom" +parseInt(this.elevators[elvIndex].getElement().style.bottom));


    // Update the elevator's current floor
    this.elevators[elvIndex].setCurrentFloor(destinationFloor);

    // let step = delta > 0 ? 10 : -10; // Adjust step size for smooth movement
    // let currentPosition = parseInt(this.elevators[elvIndex].getElement().style.bottom || '0');

    // const animate = () => {
    //   currentPosition += step;

    //   if (Math.abs(currentPosition) >= Math.abs(delta * 110)) {
    //     currentPosition = delta * 110; // Ensure it reaches the destination
    //     clearInterval(intervalId);
    //   }

    //   elvSystemElement.style.bottom = currentPosition + "px";

    //   // Update elevator floor after animation finishes
    //   if (currentPosition === delta * 110) {
    //     this.elevators[elvIndex].setCurrentFloor(destinationFloor);
    //   }
    // };

    // const intervalId = setInterval(animate, 20); // Adjust interval for animation speed (lower for faster)
  }

  public getElement(): HTMLDivElement {
    return this.elvSystemElement;
  }
}
