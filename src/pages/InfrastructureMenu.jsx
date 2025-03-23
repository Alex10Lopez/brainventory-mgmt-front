import { infraestructureMenu } from "../data/text/menuText";
import InventoryMenu from "../components/InventoryMenu";

function InfrastructureMenu() {
  return (
    <>
      <InventoryMenu
        title="Menú de Infraestructura"
        inventoryCards={infraestructureMenu}
      />
    </>
  );
}

export default InfrastructureMenu;
