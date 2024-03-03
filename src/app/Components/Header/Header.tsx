import Image from "next/image";
import styles from "./Header.module.css";
import Button from "../Buttons/Buttons";
import { MoonIcon, Bars3Icon } from "@heroicons/react/16/solid";
import { useState} from "react";

export default function Header(props: any) {
  const [isActive, setActive] = useState(false);

  function onToggleMenu(){
    setActive(!isActive);
    console.log(isActive);
  }

  return (
    <div className={styles.header}>
      <div className="grid grid-cols-3 gap-5">
        <Image
          src="/Logo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          className={"justify-self-end "}
          priority
        />
        <div className="col-span-2 justify-self-auto py-9">
          <h1 className={styles.h1}>{"Plural Research Experiment"}</h1>
          <h3 className={styles.h3}>
            {"An experiment in research independence and innocation"}
          </h3>
        </div>
      </div>
      <nav className="flex justify-between md:items-center items-baseline w-[92%] ">
        <div className={"md:static absolute justify-around border-4 border-slate-800 md:border-0 bg-white md:min-h-fit min-h-[60vh] left-0"+(isActive?" top-[-100%] ":" top-[9%] ")+ "md:w-auto w-full flex p-10"}>
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            {props.isLogin ? (
              <li className="hover:text-gray-500 ">
                <p></p>
              </li>
            ) : (
              <div className="flex items-center md:flex-row flex-col md:gap-[4vw] gap-8">
                <li className="hover:text-gray-500 ">
                  <p className={styles.links}>{"Agenda"}</p>
                </li>
                <li className="hover:text-gray-500 ">
                  <p className={styles.links}>{"Account"}</p>
                </li>
              </div>
            )}
            <li>
              <Button
                className={styles.button}
                name={props.isLogin ? "ZUPAZZ REGISTER" : "Log Out"}
                onClick={props.Login}
              />
            </li>
          </ul>
          </div>
          <div className="flex items-center gap-6">
            <Bars3Icon onClick={onToggleMenu} className="text-3xl font-semibold leading-5 h-5 cursor-pointer md:hidden"/>
            <Button name=<MoonIcon className={styles.button} /> />
          </div>
      </nav>
    </div>
  );
}
