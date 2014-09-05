//     obj
//     (c) sf
//     obj is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module obj
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';


	require('es5-shim');

	var subject = require('subject');

	var obj = subject({

		initialize: function initialize() {
			this._pipes = [];
			this._eventListeners = {};
			this._children = [];
		},

		set: function set(key, value) {

			// if this object doesn't have its own prop
			// if has parent,call parent set
			if (this.hasOwnProperty(key) && this._parent) {

				this._parent.set.apply(this._parent, arguments);

			} else {

				// no parent or has own property, thus set directly value
				// and emit corresponding events


				// grab previous
				var previous = this[key];

				// set
				this[key] = value;

				// emit events
				this.emit('change', this);
				this.emit('change:' + key, value, previous);


			}

			// always return this.
			return this;
		},

		getAs: function getAs(key, processor) {

		},

		is: function is(criteria) {

		},

		addEventListener: function addEventListener(eventName) {

		},

		emit: function emit(eventName) {


			this._eventListeners.forEach(function (listener, eventName) {

				listener();

			}.bind(this));

			this._children.forEach(function (child, index) {

				child.emit(eventName)

			}.bind(this));
		},

		pipeChangesTo: function pipeChangesTo(map) {

		},

		createChild: function createChild(data) {

			var child = Object.create(this);

			// set parent
			child._parent = this;

			this._children.push(child);

			return child;
		},
	});
});
