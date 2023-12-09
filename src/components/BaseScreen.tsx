import { Fragment, h } from 'preact';
import style from "./BaseScreen.css";
import { Link } from 'preact-router';
import useObservableListener from '../utils/useObservableListener';
import { textService } from '../services/TextService';

type MenuID = "texts" | "new" | "rnd" | "stats" | "settings" | "info";

interface MenuOption {
  id: MenuID;
  icon: string;
  txt: string;
  url: string;
  counter?: boolean;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    id: "texts",
    icon: `/assets/svg/numbered-list-left.svg`,
    txt: "Texts",
    url: "/",
  },
  {
    id: "new",
    icon: `/assets/svg/plus-circle.svg`,
    txt: "Add new",
    url: "/edit",
  },
  {
    id: "rnd",
    icon: `/assets/svg/refresh.svg`,
    txt: "Random",
    url: "/random",
  },
  {
    id: "stats",
    icon: `/assets/svg/stats-down-square.svg`,
    txt: "Stats",
    url: "/stats",
    counter: true
  },
  {
    id: "settings",
    icon: `/assets/svg/settings.svg`,
    txt: "Settings",
    url: "/settings",
  },
  {
    id: "info",
    icon: `/assets/svg/info-circle.svg`,
    txt: "About",
    url: "/info",
  },
]

export function BaseScreen(props: { children: any, selected: MenuID }) {
	const wordCounters = useObservableListener(textService.todayCounter);
  return (
    <div className={style.mainContainer}>
      <div className={style.headerContainer}>
        <div className={style.headerLogo}>
          <Link href={"/"} style={{alignSelf: "center", justifySelf: "center"}}><img src={`/assets/logo.svg`} alt="Preact Logo" style={{width: "0.75cm"}} /></Link>
        </div>
        <div className={style.headerCenter}></div>
        {MENU_OPTIONS.map(o => <Fragment>
          <div className={`${style.headerMenu} ${o.id == props.selected ? style.headerMenuSelected : ""}`}>
            <Link href={o.url} style={{alignSelf: "center", textAlign: "center", fontSize: "0.9em"}}>
              <img src={o.icon} alt={o.txt} style={{filter: "invert(1) sepia(1) saturate(5) hue-rotate(175deg)", width: "0.4cm", height: "0.4cm"}} />
              {(o?.counter && wordCounters) ? <sub><small>{wordCounters}</small></sub> : null}
              <span className={style.hideOnSmallWindows}>
                <br/>
                {o.txt}
              </span>
            </Link>
          </div>
        </Fragment>)}
      </div>
      <div className={style.contentContainer}>
        {props.children}
      </div>
    </div>
  );
}