interface FloorButtonEvent {
    floorNumber: number; // The floor where the button was pressed
  }

  class Building {
    private floors: Floor[];
    private elvSystem: ElevatorSystem;
  
    constructor(numFloors: number, numElevators: number) {

      this.elvSystem = new ElevatorSystem(numElevators);
  
      const handleFloorRequest = (eventData: FloorButtonEvent) => {
        this.elvSystem.handleFloorRequest(eventData);
      };
  
      this.floors = Array.from({ length: numFloors }, (_, i) => new Floor(numFloors - i, handleFloorRequest));
  
      const buildingElement = document.createElement('div');
      buildingElement.classList.add('building');
  
      const floorsContainer = document.createElement('div');
      floorsContainer.classList.add('floors');
  
      // Create DIV element for elevator system
      //const elevatorsContainer = document.createElement('div');
      //elevatorsContainer.classList.add('elevators');
  
      this.floors.forEach(floor => {
        floorsContainer.appendChild(floor.getElement());
      });
  
      buildingElement.appendChild(floorsContainer);
      buildingElement.appendChild(this.elvSystem.getElement());

      document.body.appendChild(buildingElement);
    }
  }
