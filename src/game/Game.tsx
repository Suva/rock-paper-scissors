import {useState} from "react"
import {Gesture} from "./Types"
import RollIndicator from "./RollIndicator"
import BetButton from "./BetButton";
import "./Game.scss"
import useSound from 'use-sound';

import {BET_AMOUNT, INITAL_FUNDS, MAX_BETS, MULTI_BET_MULTIPLIER, SINGLE_BET_MULTIPLIER} from "../settings";

const winConditions = {
    [Gesture.NONE]: Gesture.NONE,
    [Gesture.ROCK]: Gesture.SCISSORS,
    [Gesture.PAPER]: Gesture.ROCK,
    [Gesture.SCISSORS]: Gesture.PAPER
}

export default function Game () {
    const [funds, setFunds] = useState<number>(INITAL_FUNDS)
    const [bets, setBets] = useState<Gesture[]>([])
    const [currentRoll, setCurrentRoll] = useState<Gesture>(Gesture.PAPER)
    const [playSpin] = useSound("sound/spin.mp3")
    const [playWin] = useSound("sound/coin.mp3")
    const [playBet] = useSound("sound/bet.mp3")
    const [playUnbet] = useSound("sound/unbet.mp3")

    function calculateWinnings(newRoll: Gesture) {
        if(isWin(bets, newRoll)){
            playWin()
            if(bets.length === 1) {
                setFunds(funds + BET_AMOUNT * SINGLE_BET_MULTIPLIER)
            } else {
                setFunds(funds + BET_AMOUNT * MULTI_BET_MULTIPLIER)
            }
        }
        setBets([])
    }

    function isWin(bets: Gesture[], newRoll: Gesture) {
        let result = 0
        for(let bet of bets) {
            if(bet === newRoll)
                continue
            result += (winConditions[bet] === newRoll) ? 1 : -1
        }
        return result > 0
    }

    function roll() {
        setCurrentRoll(Gesture.NONE)
        setTimeout(()=> {
            playSpin()
            const newRoll = Math.floor(Math.random() * 3) + 1;
            setCurrentRoll(newRoll)
            setTimeout(() => calculateWinnings(newRoll), 1000)
        }, 50)
    }

    function makeBet(type: Gesture) {
        if(bets.includes(type)){
            playUnbet()
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

        playBet()
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