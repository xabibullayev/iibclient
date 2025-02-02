"use client";
import { Add, Delete, Edit } from "@mui/icons-material";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Users() {
  return (
    <div className={styles.users}>
      <div className={styles.main}>
        <div className={styles.top}>
          <h1>Paydalaniwshilar</h1>

          <Link href="/users/add-user">
            <Add /> Add
          </Link>
        </div>

        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <td>Paydalaniwshi ati</td>
                <td>Paroli</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>admin</td>
                <td>12345</td>
                <td>
                  <div>
                    <button>
                      <Edit className={styles.editIcon} />
                    </button>
                    <button>
                      <Delete className={styles.deleteIcon} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
