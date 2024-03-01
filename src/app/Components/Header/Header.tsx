import Image from "next/image";
import styles from "./Header.module.css";
import Button from "../Buttons/Buttons";
import { MoonIcon } from "@heroicons/react/16/solid";

export default function Header(props: any) {
  return (
    <div className={styles.header}>
      <div className="grid grid-cols-3 gap-5">
        <Image
          src="/Logo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          className="justify-self-end"
          priority
        />
        <div className="col-span-2 justify-self-auto py-9">
          <h1 className={styles.h1}>Plural Research Experiment</h1>
          <h3 className={styles.h3}>
            An experiment in research independence and innocation
          </h3>
        </div>
      </div>
      <div className="flex justify-center h-16">
        {props.isLogin ? (<p></p>) : (
          <div className="grid grid-cols-2 p-5">
            <p className={styles.links}>Agenda</p>
            <p className={styles.links}>Account</p>
          </div>
        )}
        <Button
          className={styles.button}
          name={props.isLogin ? "ZUPAZZ REGISTER" : "Log Out"}
          onClick={props.Login}
        />
        <Button name=<MoonIcon className={styles.button} /> />
      </div>
    </div>
  );
}
