import {Gesture} from "./Types";
import classNames from "classnames";
import "./BetButton.scss"
import {MAX_BETS} from "../settings";

export default function BetButton(props: { bets: Gesture[], type: Gesture, onBet: Function }) {
    return <button
        className={classNames({
            betButton: true,
            active: props.bets.includes(props.type),
            disabled: props.bets.length === MAX_BETS && !props.bets.includes(props.type)
        })}
        onClick={()=>props.onBet(props.type)}>
        {(["", "✊", "✋", "✌",])[props.type]}
    </button>
}