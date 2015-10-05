/**
 * Native promises on javascript
 *
 * @module
 * @dependence excalibur-core
 * @returns {class} E.Promise
 */
!function(E) {
    'use strict';

    // used performance module
    var _performance = E.Performance;

    /**
     * Deferred
     *
     * @class
     * @constructor
     * @name Deferred
     * @param {function} onFulfilled
     * @param {function} onRejected
     * @param {function} resolve
     * @param {function} reject
     */
    function _Deferred(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
    }

    /**
     * Promise
     *
     * @class
     * @constructor
     * @name E.Promise
     * @param {function} executor Execute function
     */
    var _promise = E.Promise = function ExcaliburPromise(executor) {
        if (!this || this.constructor !== ExcaliburPromise) {
            return new ExcaliburPromise;
        }
        if (typeof executor !== 'function') {
            throw new TypeError(executor + ' is not a function');
        }

        console.log(this.constructor);

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
         * Promise's fulfill & reject reactions
         *
         * @property
         * @private
         * @type {Array}
         */
        this._deferreds = [];

        // Execute function
        this._execute(executor);
    };

    /**
     * Resolve callback
     *
     * @method
     * @private
     * @name E.Promise.prototype._resolve
     * @param {Mixed} result Resolve result
     * @returns {undefined}
     */
    _promise.prototype._resolve = function(result) {
        console.log('resolve');
        try {
            this._state = 'resolved';
            this._result = result;

        } catch(ex) {
            this._reject(ex);
        }
    };

    /**
     * Reject callback
     *
     * @method
     * @private
     * @name E.Promise.prototype._reject
     * @param {Mixed} reason Reject reason
     * @returns {undefined}
     */
    _promise.prototype._reject = function(reason) {
        console.log('reject');
        this._state = 'rejected';
        this._result = reason;

    };

    /**
     * Execute method
     *
     * @method
     * @private
     * @name E.Promise.prototype._execute
     * @param {function} executor Execute function
     * @returns {undefined}
     */
    _promise.prototype._execute = function(executor) {
        var self = this;
        try {
            executor(function(result) {
                if (!self.isPending()) return;
                self._resolve(result);
            }, function(reason) {
                if (!self.isPending()) return;
                self._reject(reason);
            });

        } catch(ex) {
            if (!self.isPending()) return;
            self._reject(ex);
        }
    };

    /**
     * Handle a deferred on promise
     *
     * @method
     * @private
     * @name E.Promise.prototype._handle
     * @param {Deferred} deferred
     * @returns {undefined}
     */
    _promise.prototype._handle = function(deferred) {
        var self = this;
        if (this.isPending()) {
            this._deferreds.push(deferred);
            return;
        }

        _performance.setImmediate(function() {
            var isResolved = self._state === 'resolved',
                callback = isResolved ? deferred.onFulfilled : deferred.onRejected;
            if (callback === null) {
                (isResolved ? deferred.resolved : deferred.reject)(self._result);
                return;
            }
            var result;
            try {
                result = callback(self._result);

            } catch (ex) {
                deferred.reject(ex);
                return;
            }
            deferred.resolve(result);
        });
    };

    // Public promise prototype methods ========================================

    /**
     * Check promise pending state
     *
     * @method
     * @name E.Promise.prototype.isPending
     * @returns {boolean}
     */
    _promise.prototype.isPending = function() {
        return this._state === 'pending';
    };

    /**
     * Add reaction to promise
     *
     * @method
     * @name E.Promise.prototype.then
     * @param {function} onFulfilled
     * @param {function} onRejected
     * @returns {ExcaliburPromise}
     */
    _promise.prototype.then = function(onFulfilled, onRejected) {
        var self = this;
        return new this.constructor(function(resolve, reject) {
            self._handle(new _Deferred(onFulfilled, onRejected, resolve, reject));
        });
    };

    /**
     * Add only reject reaction to promise
     *
     * @method
     * @name E.Promise.prototype.catch
     * @param {function} onRejected
     * @returns {ExcaliburPromise}
     */
    _promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    };

    // Public promise class methods ============================================


}(Excalibur);
