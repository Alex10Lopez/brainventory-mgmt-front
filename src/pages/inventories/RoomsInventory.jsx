import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import RoomTableColumns from "../../components/columns/RoomTableColumns";
import RoomCreateForm from "../../components/forms/createForm/RoomCreateForm";
import RoomUpdateForm from "../../components/forms/updateForm/RoomUpdateForm";
import RoomView from "../../components/views/RoomView";
import {
  saveRoom,
  findAll,
  findById,
  updateRoom,
  deleteRoom,
} from "../../api/infrastructure/roomService";
import RoomForm from "../../components/forms/RoomForm";

function RoomsInventory() {
  const tableColumns = RoomTableColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">
        Inventario de Habitaciones
      </h1>
      <InventoryManagement
        titleInventory="Habitación"
        createRecord={saveRoom}
        findAll={findAll}
        findById={findById}
        updateById={updateRoom}
        deleteById={deleteRoom}
        tableColumns={tableColumns}
        CreateModal={({ onSubmit }) => (
          <RoomForm mode="create" onSubmit={onSubmit} />
        )}
        ViewModal={RoomView}
        UpdateModal={({ readData, onSubmit }) => (
          <RoomForm mode="update" readData={readData} onSubmit={onSubmit} />
        )}
      />
    </>
  );
}

export default RoomsInventory;
