1. Introduction

This document describes the design of a software system that simulates a building elevator system. The system allows users to request elevator rides from different floors and displays the estimated arrival time.

2. Classes

The system is composed of the following classes:

FloorButtonEvent: This interface defines the data format for a floor button press event. It includes a single property:

floorNumber: The floor number that was pressed (number).

Building: This class represents the entire building structure. It manages the floors and the elevator system.

Properties:
floors: An array of Floor objects representing the floors in the building.
elvSystem: An ElevatorSystem object representing the elevator system.
Methods:
constructor: Initializes the building with a specified number of floors and elevators.
updateFloorTimer: Updates the timer display on a specific floor based on the estimated arrival time of the elevator.
BuildingFactory: This class provides a static method to create a Building object.

Methods:
createBuilding: Creates a new Building object with the specified number of floors and elevators.

Elevator: This class represents a single elevator in the system.

Properties:
elevatorElement: A reference to the HTML element representing the elevator on the UI.
currentFloor: The current floor the elevator is on (number).
elevatorAvailabilityTime: The timestamp (in milliseconds) representing when the elevator will be available for the next task.
taskList: An array of floor numbers representing the pending elevator requests.
Methods:
constructor: Initializes the elevator with default properties.
getElement: Returns the HTML element representing the elevator.
getCurrentFloor: Returns the current floor of the elevator.
addTask: Adds a floor request to the elevator's task list.
isAvailable: Checks if the elevator is currently available for a new task.
getTimeToBeAvailable: Calculates the remaining time until the elevator becomes available.
getArrivalTime: Estimates the time it takes for the elevator to reach a specific floor.
moveToFloor: Moves the elevator to a requested floor and updates the UI.

ElevatorSystem: This class manages a collection of Elevator objects and handles floor request events.

Properties:
elvSystemElement: A reference to the HTML element representing the elevator system on the UI.
elevators: An array of Elevator objects in the system.
Methods:
constructor: Initializes the elevator system with a specified number of elevators.
handleFloorRequest: Receives a floor button press event, assigns the task to the closest available elevator, and returns the estimated arrival time.
findClosestElevator: Identifies the closest available elevator for a specific floor request.
getElement: Returns the HTML element representing the elevator system.
ElevatorSystemFactory: This class provides a static method to create an ElevatorSystem object.

Methods:
createElevatorSystem: Creates a new ElevatorSystem object with the specified number of elevators.

Floor: This class represents a single floor in the building. It manages the floor button and displays the estimated elevator arrival time.

Properties:
floorElement: A reference to the HTML element representing the floor on the UI.
buttonElement: A reference to the HTML element representing the floor button.
timerElement: A reference to the HTML element representing the timer display.
timer: The remaining time until the elevator arrives at this floor (number).
onButtonPressCallback: A callback function to be executed when the floor button is pressed.
Methods:
constructor: Initializes the floor with a floor number and the callback function for button press events.
getElement: Returns the HTML element representing the floor.
getFloorNumber: Returns the floor number.
updateTimer: Updates the timer display on the floor with the new estimated arrival time.
startTimer: Starts a timer countdown to visually represent the remaining waiting time.
3. System Functionality

Users can press the button on a floor to request an elevator ride.
The Building class receives the floor button press event and delegates it to the ElevatorSystem.
The ElevatorSystem finds the closest available elevator and assigns the floor request to that elevator.
The assigned elevator calculates the estimated arrival time and sends it back to the floor.
