interface FloorButtonEvent {
    floorNumber: number; // The floor where the button was pressed
  }

  class Building {
    private floors: Floor[];
    private elvSystem: ElevatorSystem;
  
    constructor(numFloors: number, numElevators: number) {
      // יצירת מנהל המעליות
      this.elvSystem = new ElevatorSystem(numElevators);
  
      const handleFloorRequest = (eventData: FloorButtonEvent) => {
        this.elvSystem.handleFloorRequest(eventData);
      };
  
      // יצירת מערך הקומות
      this.floors = Array.from({ length: numFloors }, (_, i) => new Floor(numFloors - i, handleFloorRequest));
  
      // יצירת אלמנט div לבניין
      const buildingElement = document.createElement('div');
      buildingElement.classList.add('building');
  
      // Create DIV element for floors
      const floorsContainer = document.createElement('div');
      floorsContainer.classList.add('floors');
  
      // Create DIV element for elevator system
      //const elevatorsContainer = document.createElement('div');
      //elevatorsContainer.classList.add('elevators');
  
      // Add floors to floorsContainer
      this.floors.forEach(floor => {
        floorsContainer.appendChild(floor.getElement());
      });
  
      // Add elevators to elevatorsContainer
      //elevatorsContainer.appendChild(this.elvSystem.getElement());
  
      // Append floorsContainer and elevatorsContainer to buildingElement
      buildingElement.appendChild(floorsContainer);
      buildingElement.appendChild(this.elvSystem.getElement());
      //buildingElement.appendChild(elevatorsContainer);
  
      // הוספת אלמנט הבניין לגוף המסמך
      document.body.appendChild(buildingElement);
    }
  }//   private elevator: Elevator;
//   private floorsContainer: HTMLElement;
//   private elevatorElement: HTMLElement;

//   constructor(numFloors: number) {
//     this.floors = Array.from({ length: numFloors }, (_, i) => new Floor(i + 1));
//     this.elevator = new Elevator(1);

//     this.floorsContainer =
//       document.getElementById("floors-container") ??
//       document.createElement("div");
//     this.elevatorElement =
//       document.querySelector(".elevator p") ?? document.createElement("p");
//   }

//   public display(): void {
//     this.displayFloors();
//     this.displayElevator();
//   }

//   private displayFloors(): void {
//     this.floors.forEach((floor) => {
//       const floorElement = document.createElement("div");
//       floorElement.classList.add("floor");

//       const floorNumberElement = document.createElement("img");
//       floorNumberElement.src = `src/assets/floor-${floor.getNumber()}.png`; // התאם את קובצי התמונה
//       floorNumberElement.alt = `קומה ${floor.getNumber()}`;

//       floorElement.appendChild(floorNumberElement);
//       this.floorsContainer.appendChild(floorElement);
//     });
//   }

//   private displayElevator(): void {
//     const currentFloor = this.elevator.display();
//     this.elevatorElement.textContent = `קומה ${currentFloor}`;

//     // עדכון מיקום מעלית (סגנון CSS)
//     //this.elevatorElement.style.top = `${(currentFloor - 1) * 40}px`; // התאם את הגובה לפי קומה
//   }

//   public getFloors(): Floor[] {
//     return this.floors;
//   }

//   public moveElevatorToFloor(floorNumber: number): void {
//     this.elevator.move(floorNumber);
//     this.displayElevator(); // עדכן מצב מעלית
//   }


//  const b1 = new Building(5,3)
