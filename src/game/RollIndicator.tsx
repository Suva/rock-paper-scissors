import {Gesture} from "./Types";
import "./RollIndicator.scss"
import classNames from "classnames";

interface Props {
    roll: Gesture
}

export default function RollIndicator({roll}: Props) {
    return <div className="roll-indicator">
        <div className="arrow"></div>
        <div className={classNames({
            circle: true,
            rock: roll === Gesture.ROCK,
            paper: roll === Gesture.PAPER,
            scissors: roll === Gesture.SCISSORS
        })}>
            <div className="segment"><div className="fill"></div></div>
            <div className="segment"><div className="fill"></div></div>
            <div className="segment"><div className="fill"></div></div>

            <div className="gesture-icons">
                <div className="gesture">✊</div>
                <div className="gesture">✋</div>
                <div className="gesture">✌</div>
            </div>
        </div>
    </div>
}