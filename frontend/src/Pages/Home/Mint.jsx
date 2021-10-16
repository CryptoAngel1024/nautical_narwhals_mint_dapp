import { React, useState } from 'react'
import { Section } from 'react-scroll-section'
import useWeb3Integration from "../../hooks/useWeb3Integration.js";

export default function Mint() {

    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    const decrementCounter = () => setCounter(counter - 1);
    const mint = () => alert(counter)
    // const [
    //     account,
    //     provider,
    //     isPaused,
    //     isPresale,
    //     web3provider,
    //     onConnect,
    //     resetApp,
    //     mintedAmount,
    //     mintPreSale,
    //     mintPublicSale
    // ] = useWeb3Integration(counter);

    return (
        <Section className='mint' id='mint'>
            <h3 className='section_title'><b>Mint</b>&nbsp; <span> {web3provider ? mintedAmount : '0'}/5757</span></h3>
            <div className="mint_max">
                <span>Max 10 per txn</span>
                <div className="mint_input">
                    <button disabled={counter <= 0 ? true : false} onClick={decrementCounter}>-</button>
                    <input type="text" name="" id="" value={counter} maxLength={2} />
                    <button disabled={counter >= 10 ? true : false} onClick={incrementCounter}>+</button>
                </div>
                <div className="mint_button">
                    {
                        isPaused ? (
                            <button disabled >Mint is Paused</button>
                        ) : (
                            isPresale && !isPaused ? (
                                <button onClick={() => mintPreSale(web3provider, counter)}>Mint Presale</button>
                            ) : (
                                <button onClick={() => mintPublicSale(web3provider, counter)}>Mint</button>
                            )
                        )
                    }
                    {/* <button onClick={mint}>Minit</button> */}
                </div>
            </div>
        </Section>
    )
}
