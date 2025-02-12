# mutualfund-info

NPM Package to get the current(Today's) NAVs of Mutual Funds in India

The data is being fetched from Association of Mutual Funds India (AMFI)'s portal https://www.amfiindia.com/

## Usage

### Get all Navs . This returns all the Mutual Funds' Navs in an array format

```javascript
import mfInfo from "mutualfund-info";

const mfInstance = new mfInfo();
const navs = await mfInstance.getAllNavs();
console.log("navs", navs);
```

OR

```javascript
import mfInfo from "mutualfund-info";

const mfInstance = new mfInfo();
console.log(mfInstance.about());

(async () => {
  const navs = await mfInstance.getAllNavs();
  console.log("navs", navs);
})();
```

```javascript
// Sample Output of a NAV Object
[
  {
    'Scheme Code': '116174',
    'ISIN Div Payout/ ISIN Growth': 'INF109K01YE1',
    'ISIN Div Reinvestment': 'INF109K01YD3',
    'Scheme Name': 'ICICI Prudential Banking and PSU Debt Fund - Quarterly IDCW',
    'Net Asset Value': '10.8471',
    Date: '11-Feb-2025',
    'AMC Name': 'ICICI Prudential Mutual Fund',
    'Scheme Type': 'Open Ended Schemes(Debt Scheme - Banking and PSU Fund)'
  },
  ....
]
// Note that this will be an array of objects
// You can filter the navs by scheme type as below
const debtNavs = navs.filter(nav => nav['Scheme Type'].includes('Debt'));
console.log("debtNavs", debtNavs);

// You can also filter by AMC Name
const iciciPrudentialNavs = navs.filter(nav => nav['AMC Name'] === 'ICICI Prudential Mutual Fund');
console.log("iciciPrudentialNavs", iciciPrudentialNavs);

// you can filter by Scheme Name, Scheme Code etc

```

### Fetch Nav of a particular Mutual Fund By it's Scheme Name

there is a inbuilt
You can fetch a MF's Nav by its name as below by using the _fetchNavBySchemeName_ method.

```javascript
var schemeName =
  "Aditya Birla Sun Life Banking & PSU Debt Fund  - DIRECT - IDCW";
var schemeNav = await mfInstance.fetchNavBySchemeName(schemeName);
console.log("schemNav", schemeNav);
/*
// The sample will be something similar to
[{
  'Scheme Code': '119551',
  'ISIN Div Payout/ ISIN Growth': 'INF209KA12Z1',
  'ISIN Div Reinvestment': 'INF209KA13Z9',
  'Scheme Name': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - DIRECT - IDCW',
  'Net Asset Value': '154.6417',
  Date: '21-May-2021',
  'AMC Name': 'Aditya Birla Sun Life Mutual Fund',
  'Scheme Type': 'Open Ended Schemes(Debt Scheme - Banking and PSU Fund)'
}]
*/
```

### Fetch Nav of a particular Mutual Fund By it's Scheme Code

You can fetch a MF's Navby its code as below by using the _fetchNavBySchemeCode_ method.

```javascript
var schemeCode = "119551";
var schemecodeNav = await mfInstance.fetchNavBySchemeCode(schemeCode);
console.log("schemNav", schemecodeNav);
/*
// The sample will be something similar to
[{
  'Scheme Code': '119551',
  'ISIN Div Payout/ ISIN Growth': 'INF209KA12Z1',
  'ISIN Div Reinvestment': 'INF209KA13Z9',
  'Scheme Name': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - DIRECT - IDCW',
  'Net Asset Value': '154.6417',
  Date: '21-May-2021',
  'AMC Name': 'Aditya Birla Sun Life Mutual Fund',
  'Scheme Type': 'Open Ended Schemes(Debt Scheme - Banking and PSU Fund)'
}]
*/
```

```javascript
console.log(mfInstance.about());
// returns the about message of the package
// "mutualfund-info - NPM Package to get the NAVs of Mutual Funds in India."
```
