try {
  const buildings = buildingsData;

  const buildingsElement = document.createElement("div");
  buildingsElement.classList.add("buildings");

  for (
    let buildingIndex = 0;
    buildingIndex < buildings.length;
    buildingIndex++
  ) {
    const newBuilding = BuildingFactory.createBuilding(
      buildings[buildingIndex].numOfFloors,
      buildings[buildingIndex].numOfElevators
    );
    buildingsElement.appendChild(newBuilding.getBuildingElement());
  }

  document.body.appendChild(buildingsElement);
} catch (error) {
  console.error("Error creating buildings:", error);
}
