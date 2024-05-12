const numOfBuildings = 6
const numOfFloors = 7
const numOfElevators = 6
let buildings = [];


for (let buildingIndex = 0; buildingIndex < numOfBuildings; buildingIndex++) {
    const newBuilding = BuildingFactory.createBuilding(numOfFloors, numOfElevators);
    buildings.push(newBuilding); 
}  