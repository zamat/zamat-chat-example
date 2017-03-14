var socket = (function()
{
    var socket = function(uri, config){
        this._uri = uri;
        this._session = false;
        this._listeners = {};
        this.connect();
    };
    socket.prototype.connect = function () {
        var that = this;
        ab.connect(this._uri,
            //Function on connect
            function(session){
                that.fire({type: "socket/connect", data: session });
            },
            //Function on disconnect / error
            function(code, reason){
                that._session = false;
                that.fire({type: "socket/disconnect", data: {code: code, reason: reason}});
            }
        );
    };
    
    /**
     * Adds a listener for an event type
     *
     * @param {String} type
     * @param {function} listener
     */
    socket.prototype.on = function(type, listener){
        if (typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }
        this._listeners[type].push(listener);
    };
    
    /**
     * Fires an event for all listeners.
     * @param {String} event
     */
    socket.prototype.fire = function(event){
        if (typeof event == "string"){
            event = { type: event };
        }
        if (!event.target){
            event.target = this;
        }
        if (!event.type){  //falsy
            throw new Error("Event object missing 'type' property.");
        }
        if (this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event.data);
            }
        }
    };
    
    /**
     * Removes a listener from an event
     *
     * @param {String} type
     * @param {function} listener
     */
    socket.prototype.off = function(type, listener){
        if (this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    };
    
    return {
        connect: function(uri)
        {
            return new socket(uri);
        }
    }
})();   
