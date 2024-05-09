class ElevatorSystemFactory {
  static createElevatorSystem(numElevators: number): ElevatorSystem {
    return new ElevatorSystem(numElevators);
  }
}
