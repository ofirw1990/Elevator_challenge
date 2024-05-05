export class ElevatorFactory {
  public createElevator(initialFloor: number): Elevator {
    return new Elevator(initialFloor);
  }
}