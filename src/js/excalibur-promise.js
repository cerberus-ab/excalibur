/**
 * Native promises on javascript
 *
 * @module
 * @dependence excalibur-core
 */
!function(E) {

    'use strict';

    /**
     * Promise
     *
     * @class
     * @name E.Promise
     * @param {function} executor Execute function
     */
    var _promise = E.Promise = function Promise(executor) {
        if (!this || this.constructor !== Promise) {
            return new Promise;
        }
        if (typeof executor !== 'function') {
            throw new TypeError(executor + ' is not a function');
        }

        /**
         * Promise's state
         *
         * @property
         * @private
         * @type {string:[pending,resolved,rejected]}
         */
        this._state = 'pending';

        /**
         * Promise's value when done
         *
         * @property
         * @private
         * @type {Mixed}
         */
        this._result = undefined;

        /**
         * Promise's fulfill reactions
         *
         * @property
         * @private
         * @type {Array}
         */
        this._fulfillReactions = [];

        /**
         * Promise's reject reactions
         *
         * @property
         * @private
         * @type {Array}
         */
        this._rejectReactions = [];


        // Execute function
        this._execute(executor);
    };

    _promise.prototype._resolve = function(result) {
        try {
            this._state = 'resolved';
            this._result = result;

        } catch(ex) {
            this._reject(ex);
        }
    };

    _promise.prototype._reject = function(reason) {
        this._state = 'rejected';
        this._result = reason;
    };

    _promise.prototype._execute = function(executor) {
        var self = this;
        try {
            executor(function(result) {
                if (!self.isPending()) return;
                this._resolve(result);
            }, function(reason) {
                if (!self.isPending()) return;
                this._reject(reason);
            });

        } catch(ex) {
            if (!self.isPending()) return;
            this._reject(ex);
        }
    };

    /**
     * Check promise pending state
     *
     * @method
     * @name E.Promise.isPending
     * @returns {boolean}
     */
    _promise.prototype.isPending = function() {
        return this._state === 'pending';
    };


}(Excalibur);
