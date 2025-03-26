import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { inventoryContext } from "./InventoryManagement";

function TableSearchForm() {
  const { setSearchValue } = useContext(inventoryContext);

  const { register, control } = useForm();

  const searchValue = useWatch({
    control,
    name: "search",
    defaultValue: "",
  });

  useEffect(() => {
    setSearchValue(searchValue);
  }, [searchValue, setSearchValue]);

  return (
    <Form.Control
      type="search"
      placeholder="Buscar"
      className="me-2"
      aria-label="Search"
      {...register("search")}
    />
  );
}

/*TableSearchForm.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
};*/

export default TableSearchForm;
