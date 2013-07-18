var currentDomain = window.location.protocol + "//" + window.location.host,
messageName = "message.type";

module('Messenger', {
  setup: function () {
    this.messenger = new TwoWay.Messenger();
  },
  teardown: function () {
    this.messenger.unsubscribe({ message: messageName });
  }
})

asyncTest('publishing a message without a domain', 2, function (assert) {
  var originalData = { one: "two" };

  this.messenger.subscribe({
    message: messageName,
    to: callback,
    from: currentDomain
  });

  this.messenger.publish({
    message: messageName,
    'with': originalData,
    to: window
  });

  function callback(result, theWindow) {
    assert.deepEqual(originalData, result, 'result recieved');
    assert.ok(window === theWindow, 'window is the window');
    start();
  }

});

asyncTest('subscribing to multiple domains', 2, function (assert) {
  var originalData = { one: "two" },
  domains = [currentDomain, "9.9.9.9"];

  this.messenger.subscribe({
    message: messageName,
    to: callback,
    from: domains
  });

  this.messenger.publish({
    message: messageName,
    'with': originalData,
    to: window
  });

  function callback(result, theWindow) {
    assert.deepEqual(originalData, result, 'result recieved');
    assert.ok(window === theWindow, 'window is the window');
    start();
  }

});

test('publishing to an invalid domain', function (assert) {
  var publishOnInvalidDomain = function () {
    this.messenger.publish({
      message: "message.type",
      'with': "some data",
      'to': window,
      'on': '1.1.1.1'
    });
  }.bind(this);

  assert.throws(publishOnInvalidDomain, DOMException, "DOMException was thrown");
});

test('publishing to an invalid domain', function (assert) {
  var publishOnInvalidDomain = function () {
    this.messenger.publish({
      message: "message.type",
      'with': "some data",
      'to': window,
      'on': '1.1.1.1'
    });
  }.bind(this);

  assert.throws(publishOnInvalidDomain, DOMException, "DOMException was thrown");
});
