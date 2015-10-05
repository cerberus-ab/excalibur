/**
 * Native promises on javascript
 *
 * @module
 * @dependence excalibur-core
 */
!function(E) {

    'use strict';

    // used performance module
    var _performance = E.Performance;

    /**
     * Promise
     *
     * @class
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
     * @name E.Promise._resolve
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
     * @name E.Promise._reject
     * @param {Mixed} result Reject reason
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
     * @name E.Promise._execute
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

    _promise.prototype._handle = function(deferred) {
        var self = this;

        if (this.isPending()) {
            this._deferreds.push(deferred);
            return;
        }

        var isResolved = this._state === 'resolved',
            callback = isResolved ? deferred.onFulfilled : deferred.onRejected;

        if (callback === null) {
            (isResolved ? deferred.resolved : deferred.reject)(this._result);
            return;
        }

        var result;
        try {
            result = callback(this._result);

        } catch (ex) {
            deferred.reject(ex);
            return;
        }
        deferred.resolve(result);
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

    _promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    };

    _promise.prototype.then = function(onFulfilled, onRejected) {
        var self = this;
        return new _promise(function(resolve, reject) {
            self._handle(new Deferred(onFulfilled, onRejected, resolve, reject));
        });
    };

    function Deferred(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
    }


}(Excalibur);
