import {useState} from "react"
import {Gesture} from "./Types"
import RollIndicator from "./RollIndicator"
import BetButton from "./BetButton";
import "./Game.scss"
import {BET_AMOUNT, INITAL_FUNDS, MAX_BETS, MULTI_BET_MULTIPLIER, SINGLE_BET_MULTIPLIER} from "../settings";

export default function Game () {
    const [funds, setFunds] = useState<number>(INITAL_FUNDS)
    const [bets, setBets] = useState<Gesture[]>([])
    const [currentRoll, setCurrentRoll] = useState<Gesture>(Gesture.PAPER)

    function calculateWinnings(newRoll: Gesture) {
        if(bets.includes(newRoll)){
            if(bets.length === 1) {
                setFunds(funds + BET_AMOUNT * SINGLE_BET_MULTIPLIER)
            } else {
                setFunds(funds + BET_AMOUNT * MULTI_BET_MULTIPLIER)
            }
        }
        setBets([])
    }

    function roll() {
        setCurrentRoll(Gesture.NONE)
        setTimeout(()=> {
            const newRoll = Math.floor(Math.random() * 3) + 1;
            setCurrentRoll(newRoll)
            setTimeout(() => calculateWinnings(newRoll), 1000)
        }, 50)
    }

    function makeBet(type: Gesture) {
        if(bets.includes(type)){
            setFunds(funds + BET_AMOUNT)
            setBets(bets.filter(b=>b!==type))
            return
        }

        if(bets.length >= MAX_BETS){
            return;
        }

        if(funds - BET_AMOUNT < 0) {
            return
        }

        setFunds(funds - BET_AMOUNT)
        setBets([...bets, type])
    }

    return <div>
        <div className="funds">{funds}</div>
        <RollIndicator roll={currentRoll}/>
        <div className="buttons">
            <BetButton bets={bets} type={Gesture.ROCK} onBet={makeBet}/>
            <BetButton bets={bets} type={Gesture.PAPER} onBet={makeBet}/>
            <BetButton bets={bets} type={Gesture.SCISSORS} onBet={makeBet}/>
            <button className="roll-button" onClick={roll}>Roll!</button>
        </div>
    </div>
}