import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import styles from "../styles/ProductInfo.module.scss";

const SizeQty = ({
  compo,
  size,
  quantity,
  handleChangeSize,
  handleChangeQty,
}) => {
  return (
    <>
      <div
        className="flexRow"
        style={compo ? { margin: "20px" } : { marginBottom: "20px" }}
      >
        <label
          htmlFor="outlined-size"
          style={compo ? { marginRight: "8px" } : { marginRight: "initial" }}
        >
          Size :
        </label>
        <FormControl variant="outlined">
          <NativeSelect
            value={size}
            onChange={handleChangeSize}
            inputProps={{
              name: "size",
              id: "outlined-size",
            }}
            className={styles.select}
          >
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </NativeSelect>
        </FormControl>
      </div>

      <div className="flexRow" style={{ margin: compo ? "20px" : "initial" }}>
        <label style={{ marginRight: compo ? "8px" : "initial" }}>
          Quantity :
        </label>
        <input
          type="number"
          min={1}
          max={10}
          className={styles.qty}
          value={quantity}
          onChange={handleChangeQty}
        />
      </div>
    </>
  );
};

export default SizeQty;
