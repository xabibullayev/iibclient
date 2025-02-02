import styles from "./Top.module.scss";
import Link from "next/link";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import VideocamIcon from "@mui/icons-material/Videocam";

export default function Top() {
  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <div className={styles.all}>
          <VideocamIcon />
          <p>{filteredPins.length}</p>
        </div>

        <div className={styles.type}>
          <select
            name=""
            id=""
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Hammesi</option>
            <option value="ptz">PTZ камера</option>
            <option value="obz">Oбзорный камера</option>
            <option value="lis">Pаспознавание лиц</option>
            <option value="avto">Pаспознавание авто номер</option>
          </select>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.users}>
          <Link href="/users">
            <RecentActorsIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
