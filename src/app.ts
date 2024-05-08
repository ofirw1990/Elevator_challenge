const numOfBuildings = 1
const numOfFloors = 7
const numOfElevators = 4

let buildings = [];


for (let buildingIndex = 0; buildingIndex < numOfBuildings; buildingIndex++) {
    const newBuilding = BuildingFactory.createBuilding(numOfFloors, numOfElevators);
    buildings.push(newBuilding); 
}  