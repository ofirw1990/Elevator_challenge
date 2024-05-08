class BuildingFactory {
  static createBuilding(numFloors: number, numElevators: number): Building {
    return new Building(numFloors, numElevators);
  }
}
