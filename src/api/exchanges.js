import { Log } from "../base/errorHandling";

export const Exchanges = new function() {
	this.APICalls = {
		binance: {
			tickerCodes : [ "SHIBUSDT" ],
			getDepth    : (tickerCode = null, levels = 0) => new Promise((resolve, reject) => {
				if (tickerCode === null) throw new Error("No ticker code passed to Binance getDepth");
				const PREFIX = "https://api.binance.com/api/v3/";
				const LEVELS = levels > 0 ? `&limit=${ levels }` : "";
				const REQ_URL = `${ PREFIX }depth?symbol=${ tickerCode }${ LEVELS }`;

				fetch(REQ_URL)
					.then((data) => {
						resolve(data.json());
					})
					.catch((err) => {
						reject(new Error(err));
					});

				Log.Linebreak("API call");
				Log.Attempt(`Exchange: ${ tickerCode } // ticker: ${ tickerCode } // levels: ${ levels } \nURL: ${ REQ_URL }`);
			}),
		},

		poloniex: {
			tickerCodes : [ "BTC_DOGE" ],
			getDepth    : (tickerCode = null, levels = 0) => new Promise((resolve, reject) => {
				if (tickerCode === null) throw new Error("No ticker code passed to Poloniex getDepth");
				const REQ_URL = `https://poloniex.com/public?command=returnOrderBook&currencyPair=${ tickerCode }&depth=${ levels }`;

				fetch(REQ_URL)
					.then((res) => {
						const bids = [ ...res.bids ];
						const asks = [ ...res.asks ].reverse();
						resolve(bids, asks);
					})
					.catch((err) => {
						reject(new Error(err));
					});

				Log.Linebreak("API call");
				Log.Attempt(`Exchange: ${ tickerCode } // ticker: ${ tickerCode } // levels: ${ levels } \nURL: ${ REQ_URL }`);
			}),
		},
	};
};
