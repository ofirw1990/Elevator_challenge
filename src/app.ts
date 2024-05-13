const numOfBuildings = 6
const numOfFloors = 12
const numOfElevators = 5

const buildingsElement = document.createElement("div");
buildingsElement.classList.add("buildings");


for (let buildingIndex = 0; buildingIndex < numOfBuildings; buildingIndex++) {
    const newBuilding = BuildingFactory.createBuilding(numOfFloors, numOfElevators);
    buildingsElement.appendChild(newBuilding.getBuildingElement()); 
}  

document.body.appendChild(buildingsElement);

