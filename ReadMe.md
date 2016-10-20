# MEAN Friends - Full MEAN stack

## Routing

  Client Route         | Server Route | Server Method
  ---------------------|--------------|--------------
  `/friends`           | `/friends`   | GET
  `/friends/add`       |`/friends`    | POST
  `/friends/:id`       |`/friends/:id`| GET
  `/friends/:id/edit`  |`/friends/:id`| PUT
  `/friends/:id/delete`|`/friends/:id`| DELETE

## Features

  The base HTML is `/client/static/index.html`

  Feature | Description          | File Location
  --------|----------------------|--------------
  INDEX   | Show List of Friends | `/client/partials/index.html`
  SHOW    | Show Friend Detail   | `/client/partials/friendDatePicker.html`
  ADD     | Add New Friend       | `/client/partials/friendDatePicker.html`
  EDIT    | Edit Friend Details  | `/client/partials/friendDatePicker.html`
  DELETE  | Delete a Friend      | `/client/partials/index.html`

## DB Schema

  ```
  var FriendSchema = new mg.Schema({
    fname: String,
    lname: String,
    dob: Date
  },
  {
    timestamps: true
  })
  ```

## Dependencies

  On     | Name                 | Version | Description
  -------|----------------------|---------|----------------------------
  Server | express              | 4.14.0  | web-server
  Server | body-parser          | 1.15.2  | package for parsing requests
  Server | mongoose             | 4.6.4   | mongoDB driver API
  Client | angular              | 1.5.8   | front-end framework
  Client | angular-route        | 1.5.8   | angular plug-in for routing
  Client | angularjs-datepicker | 2.1.6   | angular plug-in for using date-picker

#### Notes

  - Used the _[angularjs-datepicker](https://github.com/g00fy-/angular-datepicker)_ plug-in since the native html date element had a few drawbacks.
    - `<input type="date">` is not supported on Firefox.
    - Support on other browsers is very basic. Doesn't allow setting default values very easily
    - Handling the date input was becoming problematic
    - _This datepicker is a bit wonky in Firefox in terms of styling/alignment but functionality-wise seems to be A-Ok_

  - Haven't implemented the __filter: Date__ feature shown in the wireframe (on the index page). Not sure what it is supposed to filter.

  - After installing via `npm install`, copy the angular related files into the `/client/static/js` and `/client/static/css` locations and use them from there.
