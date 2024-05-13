class Elevator {
  private elevatorElement: HTMLDivElement;
  private currentFloor: number;
  private availabilityTime: number; //Date.now() + the time remaining until the elevator is free
  private isAvailable: boolean;
  private taskList: number[];

  constructor() {
    this.taskList = [];
    this.availabilityTime = Date.now();
    this.isAvailable = true;
    this.currentFloor = 1;
    this.elevatorElement = document.createElement("div");
    this.elevatorElement.classList.add("elevator");

    const imageElement = document.createElement("img");
    imageElement.src = "./src/assets/elv.png";
    imageElement.alt = "Elevator Image";

    this.elevatorElement.appendChild(imageElement);

    document.body.appendChild(this.elevatorElement);

    this.elevatorElement.style.bottom = "0px";
  }

  public getElement(): HTMLDivElement {
    return this.elevatorElement;
  }

  public getCurrentFloor(): number {
    return this.currentFloor;
  }

  // Adds a floor request to the elevator's task list and checks
  // if the elevator is available to complete it immediately
  public addTask(floorNumber: number): number {
    if (this.taskList.indexOf(floorNumber) === -1) {
      this.taskList.push(floorNumber);
      this.availabilityTime =
        Date.now() + this.getArrivalTime(floorNumber) + 2000;
      if (this.isAvailable) {
        this.completingTask();
      }
    }
    return this.availabilityTime;
  }

  // Attempts to complete the first task in the list if the elevator is available
  private completingTask() {
    if (this.taskList.length > 0) {
      const destinationFloor = this.taskList.shift();
      if (typeof destinationFloor === "number" && this.isAvailable) {
        this.isAvailable = false;
        this.moveToFloor(destinationFloor);
      }
    }
  }

  // Estimates the time it takes for the elevator to reach a specific floor
  public getArrivalTime(destinationFloor: number): number {
    const delta = destinationFloor - this.currentFloor;
    if (this.isAvailable) {
      return Math.abs(delta) * 500;
    }

    let timeToBeAvailable = this.availabilityTime - Date.now();
    return timeToBeAvailable + Math.abs(delta) * 500; //The remaining time until the elevator is free + new travel time
  }

  // Moves the elevator to a requested floor and updates the UI
  public moveToFloor(destinationFloor: number) {
    const delta = destinationFloor - this.currentFloor;
    const currentBottom = parseInt(this.elevatorElement.style.bottom || "0");

    let duration = Math.abs(delta) * 500;
    const targetBottom = currentBottom + delta * 110;

    setTimeout(() => {
      this.elevatorElement.style.transition = `bottom ${
        duration  / 1000
      }s ease-in-out`;
      this.elevatorElement.style.bottom = `${targetBottom}px`;
    }, 100);

    this.currentFloor = destinationFloor;
    setTimeout(() => {
      const audioElement = new Audio("./src/assets/ding.mp3");
      audioElement.play();

      this.elevatorElement.style.transition = "";
    }, duration);

    setTimeout(() => {
      this.isAvailable = true;
      this.completingTask();
    }, duration + 2000);
  }
}
