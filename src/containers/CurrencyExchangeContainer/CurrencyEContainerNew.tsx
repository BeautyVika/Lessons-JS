import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { CurrencyState, CurrencyType } from '../../redux/currencyReducer';
import { Dispatch } from 'redux';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    СhangeCurrentCurrencyAC,
    CurrencyReducersTypes
} from '../../redux/actions';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from "../../redux/state";

const CurrencyEContainerNew: React.FC = () => {

    // const {
    //     currencies,
    //     currentCurrency,
    //     isBuying,
    //     amountOfBYN,
    //     amountOfCurrency,
    //     setCurrencyAmount,
    //     setAction,
    //     changeCurrency,
    // } = props;

    const currencies = useSelector<IGlobalState, Array<CurrencyType>>(state => state.currency.currencies)
    const currentCurrency = useSelector<IGlobalState, string>(state => state.currency.currentCurrency)
    const isBuying = useSelector<IGlobalState, boolean>(state => state.currency.isBuying)
    const amountOfBYN = useSelector<IGlobalState, string>(state => state.currency.amountOfBYN)
    const amountOfCurrency = useSelector<IGlobalState, string>(state => state.currency.amountOfCurrency)

    const dispatch = useDispatch()

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency))
                } else {
                    dispatch(ChangeCurrencyFieldAC(amountOfBYN, (+Number(amountOfCurrency).toFixed(2) / currencyRate).toFixed(2)))

                }
            } else {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency))
                } else {
                    dispatch(ChangeCurrencyFieldAC((+Number(amountOfBYN).toFixed(2) * currencyRate).toFixed(2), amountOfCurrency))
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true)) : dispatch(ChangeActionAC(false))
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency &&  dispatch(СhangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};
//
// const mapStateToProps = ( { currency } : {currency: CurrencyState} ): CurrencyState => {
//     return {
//         currencies: currency.currencies,
//         currentCurrency: currency.currentCurrency,
//         isBuying: currency.isBuying,
//         amountOfBYN: currency.amountOfBYN,
//         amountOfCurrency: currency.amountOfCurrency,
//     };
// };
// type MapDispatchToPropsType = {
//     setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) => void
//     setAction: (isBuying: boolean) => void
//     changeCurrency: (currency: string) => void
// }
//
// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) : MapDispatchToPropsType => {
//     return {
//         setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) => {
//             dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
//         },
//         setAction: (isBuying: boolean) => {
//             dispatch(ChangeActionAC(isBuying));
//         },
//         changeCurrency: (currency: string) => {
//             dispatch(СhangeCurrentCurrencyAC(currency));
//         },
//     };
// };
//
// const connector = connect(mapStateToProps, mapDispatchToProps);
//
// type TProps = ConnectedProps<typeof connector>;
//
// export default connector(CurrencyEContainerNew);

export default CurrencyEContainerNew