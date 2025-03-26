import { humanResourcesMenu } from "../data/text/menuText";
import InventoryMenu from "../components/InventoryMenu";

function HumanResourcesMenu() {
  return (
    <>
      <InventoryMenu
        title="Menú de Recursos Humanos"
        inventoryCards={humanResourcesMenu}
      />
    </>
  );
}

export default HumanResourcesMenu;
