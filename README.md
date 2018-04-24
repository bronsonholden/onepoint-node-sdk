OnePoint HCM Node.js REST API SDK
=================================

[![NPM](https://nodei.co/npm/onepoint-node-sdk.png)](https://nodei.co/npm/onepoint-node-sdk/)

[![Build Status](https://travis-ci.org/paulholden2/onepoint-node-sdk.svg?branch=master)](https://travis-ci.org/paulholden2/onepoint-node-sdk) [![Coverage Status](https://coveralls.io/repos/github/paulholden2/onepoint-node-sdk/badge.svg?branch=master)](https://coveralls.io/github/paulholden2/onepoint-node-sdk?branch=master) [![dependencies Status](https://david-dm.org/paulholden2/onepoint-node-sdk/status.svg)](https://david-dm.org/paulholden2/onepoint-node-sdk) [![devDependencies Status](https://david-dm.org/paulholden2/onepoint-node-sdk/dev-status.svg)](https://david-dm.org/paulholden2/onepoint-node-sdk?type=dev)

[OnePoint HCM](https://onepointhcm.com) is a cloud-based HR and administration solution. Much of the functionality is available via the OnePoint REST API, and is constrained by security permissions assigned to the acting API user.

## Examples

Below are a few usage examples.

#### Connecting

To connect, you must have a user account registered with the company in
OnePoint, as well as the company's REST API key (generated and retrieved by
admin users). The company short name can be found in company settings.

```js
const OnePoint = require('onepoint-node-sdk');

var onePoint = new OnePoint({
  username: 'your_username',
  password: 'your_password',
  companyShortName: 'company_short_name',
  apiKey: 'your_api_key'
});

onePoint.connect((err) => {
  // You are now connected
});
```

#### Disconnecting

After a connected client is closed, it will reject any further requests.
Once it has completed all requests that are currently in the queue, the
callback triggers.

```js
// 1) close() is called
onePoint.close(() => {
  // 3) All enqueued requests are now complete and the client is disconnected
});

// 2) Any further requests return an error
```

### Reports

When dealing with reports, you can pass an options object with a query-like
structure to designate what kind of report(s) you want to run. All
report-related functions will return an array of results, even if one match
is found. The exception is when passing the report's unique identifier
(`settingsId`) directly (see below).

Note that there are data size and row restrictions enforced by OnePoint
depending on the time of day you run reports. More information [here](https://secure.saashr.com/ta/docs/rest/#Limits)

#### List Reports

```js
onePoint.listReports((err, reports) => {
  // reports is an array of reports saved under the acting user account
  //
  // [
  //   {
  //     settingsId: 12345,
  //     savedName: 'Your Report Name'
  //   },
  //   ...
  // ]
});
```

#### Get Report (query-like)

```js
onePoint.getReport({
  where: {
    savedName: 'Your Report Name'
  }
}, (err, reports) => {
  // reports is an array of reports and results that match your filter
  //
  // [
  //   {
  //     settingsId: 12345,
  //     savedName: 'Your Report Name'
  //   },
  //   ...
  // ]
});
```

#### Get Report (exact)

```js
onePoint.getReport(12345, (err, report) => {
  // reports is a single report object
  //
  // {
  //   settingsId: 12345,
  //   savedName: 'Your Report Name'
  // }
});
```

#### Run Report (query-like)

Run reports that match a query-like filter. You can pass a report name
directly as the first argument as shorthand.

```js
onePoint.runReport({
  where: {
    savedName: 'Your Report Name'
  }
}, (err, reports) => {
  // reports is an array of reports and results that match your filter
  //
  // [
  //   {
  //     settingsId: 12345,
  //     savedName: 'Your Report Name',
  //     results: [
  //       {
  //         "Col1": "Val1",
  //         "Col2": "Val2"
  //       },
  //       ...
  //     ]
  //   },
  //   ...
  // ]
});

// or

onePoint.runReport('Your Report Name', (err, reports) => {
  // Same result as above
});
```

#### Run Report (exact)

Pass the report's System ID (you can find this in OnePoint via the web
interface, or by listing/retrieving reports).

```js
onePoint.runReport(12345, (err, reports) => {
  // reports is a single report object with results
  //
  // {
  //   settingsId: 12345,
  //   savedName: 'Your Report Name',
  //   results: [
  //     {
  //       "Col1": "Val1",
  //       "Col2": "Val2"
  //     },
  //     ...
  //   ]
  // }
});
```
