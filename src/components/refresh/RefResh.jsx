import styles from "./Refresh.module.scss";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function RefResh() {
  return (
    <div>
      <button
        onClick={() => window.location.reload()}
        className={styles.refreshPage}
      >
        <RefreshIcon className={styles.refreshIcon} />
      </button>
    </div>
  );
}
